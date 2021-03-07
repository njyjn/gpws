import {Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table({tableName: 'whereis'})
export class Whereis extends Model {
    @PrimaryKey
    @Column
    public chat_id: string;

    @Column
    public name?: string;

    @Column
    public lattitude?: string;

    @Column
    public longitude?: string;

    @Column
    public status?: string;

    @Column
    public source?: string;

    @CreatedAt
    public createdAt: Date = new Date();

    @UpdatedAt
    public updatedAt: Date = new Date();
}