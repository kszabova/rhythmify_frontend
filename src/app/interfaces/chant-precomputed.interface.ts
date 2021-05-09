import { IChant } from 'src/app/interfaces/chant.interface';
import { IJsonVolpiano } from 'src/app/interfaces/json-volpiano.interface';

export interface IChantPrecomputed {
    db_source: IChant,
    json_volpiano: IJsonVolpiano,
    stresses: boolean[][]
}