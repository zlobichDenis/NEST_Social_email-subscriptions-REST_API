import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubscriberEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;
}