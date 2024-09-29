/**
 * API documentation: https://docs.google.com/document/d/10UYWJ3d9BhPBzf_pKj2hv4E8uGHWb3rWGVsddcxKZRc/edit
 */

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

class FHIClient {
  private URL = 'https://fighthealthinsurance.com/ziggy/rest/denialcreator';

  async createDenial(options: CreateDenialRequestOptions) {
    try {
      const response = await fetch(this.URL, {
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
}

export const FHI_CLIENT = new FHIClient();
