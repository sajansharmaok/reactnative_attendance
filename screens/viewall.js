import React ,{ useEffect,useState} from 'react'
import { View, StyleSheet, } from 'react-native'
import { Actions} from 'react-native-router-flux';
import axios from 'axios';
import { DataTable,IconButton,Colors,Modal,Text,TextInput, Portal, Button, Provider, Dialog} from 'react-native-paper';

export default function Viewall(){
	const [name,setname]=useState('');
	const [updtaeid,setid]=useState('');
   const [email,setemail]=useState('');
   const [pass,setpass]=useState('');
	// const update =()=>{
	// 	axios.post('http://localhost:8081/reactnativeapi/axios.php',{
 //         request:1,
 //         name:name,
 //         email:email,
 //         pass: pass,
 //      })
 //      .then(response=>{
 //        console.log(response.data);
 //      })
 //      .catch(error=>{
 //        console.log(error);
 //      })
 //  }
	 const [visible, setVisible] = useState(false);

  const showModal = (id,name,email,pass) => {
  	console.log(pass);
 	setid(id)
 	setname(name)
 	setemail(email)
	setpass(pass)
  	setVisible(true);
  }
  const hideModal = () => setVisible(false);
	useEffect(()=>{
		getdata();
	},[]);
	const[show,setshow]= useState([]);
	const deldata=(id)=>{
		alert('User Deleted');
axios.post('http://localhost:8081/reactnativeapi/axios.php',{
         request:4,
         id:id,
      })
      .then(response=>{
      getdata();
      })
      .catch(error=>{
        console.log(error);
      })
	}
	const updatedata=()=>{
		alert(`${name}:-user updated `);
axios.post('http://localhost:8081/reactnativeapi/axios.php',{
         request:5,
         id:updtaeid,
         name:name,
         email:email,
         pass: pass,
      })
      .then(response=>{
      getdata();
      hideModal();
      })
      .catch(error=>{
        console.log(error);
      })
	}
	const getdata =()=>{
		axios.post('http://localhost:8081/reactnativeapi/axios.php',{
         request:3,
      })
      .then(response=>{
        setshow(response.data)
      })
      .catch(error=>{
        console.log(error);
      })
	}
 return(
<View>
  <DataTable>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title >Name</DataTable.Title>
          <DataTable.Title >Email</DataTable.Title>
           <DataTable.Title >Password</DataTable.Title>
           <DataTable.Title >Delete</DataTable.Title>
           <DataTable.Title >Edit Profile</DataTable.Title>
        </DataTable.Header>
{show.map(x=>{
	let {id ,name, email, password} = x
	return(
        <DataTable.Row key={id}>
          <DataTable.Cell>{id}</DataTable.Cell>
          <DataTable.Cell >{name}</DataTable.Cell>
          <DataTable.Cell >{email}</DataTable.Cell>
          <DataTable.Cell >{password}</DataTable.Cell>
           <DataTable.Cell onPress={()=>deldata(id)}><IconButton
    icon="delete"
    color={Colors.red500}
    size={20}/>
           </DataTable.Cell>
             <DataTable.Cell onPress={()=>showModal(id,name,email,password)}><IconButton
    icon="account-edit"
    color={Colors.red500}
    size={20}/>
           </DataTable.Cell>
        </DataTable.Row>
)
})
}
     </DataTable>   
        <Modal className="mod" animationType="slide"
        transparent={true} visible={visible} onDismiss={hideModal}>
     <View style={{ marginTop: 120 }}>    
            <TextInput 
               placeholder = "Name"
				value={name}
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={e=>setname(e)}
               />
             <TextInput 
             placeholder = "E-mail"

             value={email}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
               onChangeText={e=>setemail(e)}
               />
            <TextInput  
               placeholder = "Password"
               value={pass}
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
            onChangeText={e=>setpass(e)}
              />      
             <Button onPress={()=>updatedata()}  title='update' >
         Update
        </Button>
           <Button onPress={hideModal}  title='cancel' >
         Cancel
        </Button>
       </View>
        </Modal>
        
       
</View>
 	)
}
const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 5,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      padding: 10
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})