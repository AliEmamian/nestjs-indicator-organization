import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum indexType {
  KALAN = 'kalan',
  MIANI = 'miani',
  AMALKARDI = 'amalkardi',
}


@Entity('indicator')
export class Indicator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false })
  public goal: string;

  @Column({ type: 'varchar', nullable: true })
  public value: number;

  @Column({ type: 'varchar', nullable: false, enum: indexType })
  public type: indexType;

  @Column({ type: 'varchar', nullable: false })
  public month: number;

  @Column({ type: 'varchar', nullable: false })
  public departmentId: string;

  @Column({ type: 'varchar', nullable: true })
  public parentIndicatorId: string | null;
}
