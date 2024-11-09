// DeleteDataPage.test.tsx  
import React from 'react';  
import { render, fireEvent, screen, waitFor } from '../../../test-utils';  
import { DeleteDataPage } from './DeleteData.page';  
import { FHI_CLIENT } from '@/logic/clients/FhiClient';  

jest.mock('@/logic/clients/FhiClient');  

const mockDeleteData = FHI_CLIENT.deleteData as jest.Mock;  

describe('DeleteDataPage Component', () => {  
    beforeEach(() => {  
	jest.resetAllMocks();  
	mockDeleteData.mockResolvedValue(); // Default to resolving (success)  
    });  
    
    it('renders email input and delete button', () => {  
	render(<DeleteDataPage />);  
	expect(screen.getByLabelText('Email')).toBeInTheDocument();  
	expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();  
    });  
    
    it('calls FHI_CLIENT.deleteData on delete button click with provided email', async () => {  
	const userEmail = 'test@example.com';  
	render(<DeleteDataPage />);  
	const emailInput = screen.getByLabelText('Email');  
	const deleteButton = screen.getByRole('button', { name: 'Delete' });  
	
	fireEvent.change(emailInput, { target: { value: userEmail } });  
	fireEvent.click(deleteButton);  
	
	await waitFor(() => expect(mockDeleteData).toHaveBeenCalledTimes(1));  
	expect(mockDeleteData).toHaveBeenCalledWith({ email: userEmail });  
    });  
    
    it('displays success message on successful deletion', async () => {  
	mockDeleteData.mockResolvedValue(); // Ensure resolves (success)  
	render(<DeleteDataPage />);  
	const deleteButton = screen.getByRole('button', { name: 'Delete' });  
	fireEvent.click(deleteButton); // Click without email to test initial case  
	
	await waitFor(() => expect(screen.queryByText('Ok, data removed')).not.toBeInTheDocument());  
	// Provide email and click again  
	const emailInput = screen.getByLabelText('Email');  
	fireEvent.change(emailInput, { target: { value: 'test@example.com' } });  
	fireEvent.click(deleteButton);  
	
	await waitFor(() => expect(screen.getByText('Ok, data removed')).toBeInTheDocument());  
    });  
    
    it('displays failure message on deletion failure', async () => {  
	const error = new Error('Mocked deletion error');  
	mockDeleteData.mockRejectedValue(error); // Simulate rejection (failure)  
	render(<DeleteDataPage />);  
	const deleteButton = screen.getByRole('button', { name: 'Delete' });  
	const emailInput = screen.getByLabelText('Email');  
	fireEvent.change(emailInput, { target: { value: 'test@example.com' } });  
	fireEvent.click(deleteButton);  
	
	await waitFor(() => expect(screen.getByText('Failure, try again later')).toBeInTheDocument());  
    });
})
