import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./User";

@Entity()
class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filePath: string;

    @Column()
    fileId: string;

    @Column({ nullable: true })
    fileHash: string;

    @Column()
    anyUpdate: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @ManyToOne(() => User, user => user.subscriptions)
    user: User
}


export default Subscription;