import React, { useState, useEffect} from "react";
import { View, Picker, StyleSheet, Text,ScrollView,TouchableOpacity,AsyncStorage,Image
,SafeAreaView,
  StatusBar} from "react-native";
import { Button, Title, Card,IconButton,Colors,Modal,TextInput,
 Portal, Provider, Dialog ,RadioButton} from "react-native-paper";
import { Actions } from "react-native-router-flux";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Body, Header, Icon, Left, Right,DatePicker
} from 'native-base';
import axios from "axios";


export default function studentlist() {

    let [teachers, setteachers] = useState([]);

  useEffect(() => {
    getTeachers();
     }, []);
     
   const activeteacher= (username,password) =>{
 axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 26,  // change inactive status to active  from teacher table 
          role:'teacher',
          username:username,
          password:password,
        }
      )
      .then((response) => {
        getTeachers();
        alert(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });                                  
  };
  const getTeachers = () => {
    axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 28,//fetch all inactive teacher in list
        }
      )
      .then((response) => {
        setteachers(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [name, setName] = useState('');
  
  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
})
const logout = () =>{
  AsyncStorage.setItem("user", '' );
  Actions.login()
}
  return (
    <View style={styles.container}>
<Header>
      <Left>
<Icon ios='ios-menu' android="md-menu" style={{fontSize: 30, color:'#fff'}}/>
</Left>
<Body>
    <Text style={{textAlign:'center', color:'#fff'}}>Teacher Screen</Text>
</Body>
<Right>
<Text style={{textAlign:'right', color:'#fff'}} onPress={logout}>LOG OUT</Text>
</Right>
      </Header>
  <Text style={styles.welcome}>
      <Text >Welcome</Text>
      <Text> {name} </Text>
      </Text>
    <ScrollView>
<View style={styles.content}>
<Title style={styles.welcome}>List of Inactive Teachers</Title>
{teachers.map((x) =>{
let {id,name,email,phone_no,password,username,image,gender,dob,class_name,subject,qualification} = x
return (
    <Card style={styles.mycard}
    key={id} >
    <View style={styles.cardView}>
        <Image
        style={{width:60,height:60,borderRadius:30}}
        source={image?{uri: image}:{uri: 'https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png'}}
        />
        <View style={{marginLeft:10}}> 
            <Text style={styles.text}>{name}</Text>   
             <Text style={styles.text}>{email}</Text>  
             <Text style={styles.text}>{phone_no}</Text> 
             
             <Right>
             <Icon
                        ios="ios-trash"
                        android="md-checkbox"
                        style={{
                          fontSize: 30,
                          color: "#333",
                        }}
                        onPress={() => activeteacher(username,password)}
                      />
             </Right>  
        </View>
    </View>
   </Card>
        )
    })}
  </View>
        </ScrollView>
 
    </View>
  );
}
const mytheme = {
    colors: {
      primary: '#05c5f5',
    },
  };
const styles = StyleSheet.create({
 container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 40,
    
  },
  button: {
    width: '60%',
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: '#006aff',
    marginBottom: 20,
  },
  mycard:{
    margin:5,
   
},
cardView:{
     flexDirection:"row",
     padding:6
},
text:{
    fontSize:18,
},
  container: {
    flex: 1,
 
  },
  textBox: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginTop: 10,
    padding: 10,
  },
  scroll: {
    width: "100%",
  },
  btn: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent:'center',
    marginHorizontal: 20,
  },
  welcome: {
    fontWeight:'bold',
    textAlign: 'center',
    margin: 20,
    padding: 20,
    fontSize:28
  },
  inputstyle: {
    margin: 5,
  },
  modalstyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  textstyle:{
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'grey',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  datetextstyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    color: 'grey',
    backgroundColor: '#f2f2f2',
  },
  datestyle: {
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'grey',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  pickerstyle:{
    margin: 5,
    padding:15,
    borderRadius:5,
    borderColor:'grey',
    borderWidth:1,
    color :'grey',
    backgroundColor:'#f2f2f2',
  },
  modalView: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 5,
  },
});