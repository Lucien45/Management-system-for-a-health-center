import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  nom: string;

  @Column({ type: 'varchar', nullable: true })
  prenom: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  civilite: string;

  @Column({ type: 'date', nullable: true, default: null })
  date_naissance: Date;

  @Column({ type: 'varchar', nullable: true })
  telephone?: string | null;

  @Column({ type: 'varchar', nullable: true })
  profile?: string | null;

  @Column({
    type: 'enum',
    enum: ['admin', 'doctor', 'nurse', 'receptionist', 'autre'],
    default: 'autre',
  })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  date_mise_jour: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | null;
}
