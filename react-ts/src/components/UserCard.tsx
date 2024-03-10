const UserCard = ({name, age} : {name: string, age: string}) => {
    return <div>{name}
        <h1>{age}</h1>
    </div>
        
}
 
export default UserCard;