import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';



@Entity('department')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  public name: string;  
}
