export class ValidacionError extends Error {

    constructor(public readonly detalles: string[]) {
        super('La petición no cumplió con el contrato establecido.');
        this.name = 'ValidacionError';
    }
    
}