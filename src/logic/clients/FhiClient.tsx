/**
 * API documentation: https://docs.google.com/document/d/10UYWJ3d9BhPBzf_pKj2hv4E8uGHWb3rWGVsddcxKZRc/edit
 */

// Denial flow interfaces
export interface CreateDenialRequestOptions {
  zip?: string;
  isPii: boolean;
  isTos: boolean;
  isPrivacy: boolean;
  isOkToStoreRawEmail?: boolean;
  isOkToUseExternalModels?: boolean;
  denialText: string;
  healthHistory: string;
  email: string;
}

export interface CreateDenialResponse {
  selected_denial_type: number[];
  all_denial_types: { id: number; name: string }[];
  denial_id: string;
  your_state: string | null;
  procedure: string;
  diagnosis: string;
  semi_sekret: string;
}

// Delete Data interfaces
interface DeleteDataRequestOptions {
  email: string;
}

class FHIClient {
  private API_BASE = 'https://fighthealthinsurance.com/ziggy/rest';
  private CREATE_DENIAL_URL = `${this.API_BASE}/denialcreator`;

  async createDenial(options: CreateDenialRequestOptions) {
    try {
      const response = await fetch(this.CREATE_DENIAL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zip: options.zip,
          pii: options.isPii,
          tos: options.isTos,
          privacy: options.isPrivacy,
          store_raw_email: options.isOkToStoreRawEmail,
          use_external_models: options.isOkToUseExternalModels,
          denial_text: options.denialText,
          health_history: options.healthHistory,
          email: options.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Error generating denial');
      }

      const data = (await response.json()) as CreateDenialResponse;

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private REMOVE_DATA_URL = `${this.API_BASE}/removedata`;

  async deleteData(options: DeleteDataRequestOptions): Promise<void> {
    try {
      const response = await fetch(this.REMOVE_DATA_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(`Invalid request: ${JSON.stringify(errorData)}`);
        }
        throw new Error('Error deleting data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}

export const FHI_CLIENT = new FHIClient();
