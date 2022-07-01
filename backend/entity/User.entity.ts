import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class UserInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email:String

    @Column()
    password:String

    @Column({nullable:true})
    token:String

}

export default UserInfo