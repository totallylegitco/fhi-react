import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import { DeleteDataPage } from './DeleteData.page';
import { FHI_CLIENT } from '@/logic/clients/FhiClient';

describe('DeleteDataPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders delete data page with title and input', () => {
    render(
      <MantineProvider>
        <DeleteDataPage />
      </MantineProvider>
    );
    expect(screen.getByText('Delete your Data')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('handles successful data deletion', async () => {
    const mockDeleteData = vi.spyOn(FHI_CLIENT, 'deleteData').mockResolvedValue();
    const testEmail = 'test@example.com';

    render(
      <MantineProvider>
        <DeleteDataPage />
      </MantineProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const deleteButton = screen.getByText('Delete');

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteData).toHaveBeenCalledWith({ email: testEmail });
      expect(
        screen.getByText('Any data associated with your email has been removed.')
      ).toBeInTheDocument();
    });
  });

  it('handles failed data deletion', async () => {
    const mockDeleteData = vi.spyOn(FHI_CLIENT, 'deleteData').mockRejectedValue(new Error());
    const testEmail = 'test@example.com';

    render(
      <MantineProvider>
        <DeleteDataPage />
      </MantineProvider>
    );

    const emailInput = screen.getByLabelText('Email');
    const deleteButton = screen.getByText('Delete');

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteData).toHaveBeenCalledWith({ email: testEmail });
      expect(screen.getByText('Error: try again later')).toBeInTheDocument();
    });
  });
});
