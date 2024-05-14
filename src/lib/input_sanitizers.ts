export type ProcessedEmailString = string;
export type ProcessedPasswordString = string;

export function processEmailString (raw_email: string): { error: string | null; email: ProcessedEmailString | null; } {
    return {
        error: null,
        email: raw_email
    }
}

export function processPasswordString (raw_password: string): { error: string | null; password: ProcessedPasswordString | null; } {
    return {
        error: null,
        password: raw_password
    }
}