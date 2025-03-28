export interface MigrationPayload {
    url: string;
    namespace: string;
    cluster: string;
  }
  
  export interface MigrationResponse {
    message: string;
    status: number;
  }