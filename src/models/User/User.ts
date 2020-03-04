import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column({ type: 'varchar', length: 100 })
    NAME: string;

    @Column({ type: 'varchar', default: 'basic' })
    ROLE: string;

    @Column({ type: 'varchar', nullable: false })
    PASSWORD: number;

    @Column({ type: 'varchar' })
    EMAIL: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    PHONE: 'string';

    @CreateDateColumn()
    CREATED_AT: 'string';

    @UpdateDateColumn()
    UPDATED_AT: 'string';

    // model methods
}