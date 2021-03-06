

import React, {  useState, useEffect } from 'react';
import {View, Text, StyleSheet,AsyncStorage, TouchableOpacity, Alert, BackHandler} from 'react-native';
import {Body, Header, Icon, Left, Right, Button} from 'native-base';

 import { Actions } from 'react-native-router-flux';
 
 
const Principalscreen = (props)=> {

  const [name, setName] = useState('');
  
  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
})

const logout = () => {
  Alert.alert("Hold on!", "Are you sure you want to Logout?", [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel"
    },
    { text: "YES", onPress: () => backAction()  }
  ]);
  return true;
};

// useEffect(() => {
//   BackHandler.addEventListener("hardwareBackPress", backAction);

//   return () =>
//     BackHandler.removeEventListener("hardwareBackPress", backAction);
// }, []);


const backAction = () =>{
 
  AsyncStorage.removeItem("user")
        .then(() => console.log('success'));
  Actions.login()
}

  return (
    
    <View style={styles.container}>
       
       
        <Header>
         <Left>
        <Button transparent onPress={() => alert("Drawer Menu")}>
        <Icon name='menu' />
        </Button>
            </Left>
            <Body>
        <Text style={{textAlign:'right', color:'#fff'}}>Principal Screen</Text>
                                
            </Body>
            <Right>
            <Icon name="log-out" 
                     ios='ios-log-out' android="md-log-out"
                    onPress={logout} 
                    style={{fontSize: 30, color:'#fff'}}/>     
                    
                       </Right>
                        
        </Header>

      <Text style={styles.welcome}>Principal screen!</Text>
      <Text style={styles.welcome}>
      <Text >Welcome</Text>
      <Text> {name} </Text>
      </Text>
      
      <Text>Principal Screen</Text>
      <View style={{flexDirection:"row", margin:10}}>
      <Text style={styles.textstyle} onPress={()=> Actions.adminqrgenerate()}>
        Generate QR
        
        </Text>
     


      </View>

      <View style={{flexDirection:"row", margin:10}}>
      <Text style={styles.textstyle} onPress={()=> Actions.addsubject()}>
        Add Subject</Text>
      <Text style={styles.textstyle} onPress={()=> Actions.addclass()}>
        Add Class</Text>
     


      </View>
      <View style={{flexDirection:"row", margin:10}}>
      <Text style={styles.textstyle} onPress={()=> Actions.studentsignup()}>
        Add Student</Text>

      <Text style={styles.textstyle} onPress={()=> Actions.studentlist()}>
      View Students</Text>


      </View>
    
    <View style={{flexDirection:"row", margin:10}}>
    <Text style={styles.textstyle} onPress={()=> Actions.register()}>
        Add Teacher</Text>

      <Text style={styles.textstyle} onPress={()=> Actions.teacherlist()}>
      View Teachers</Text>


      </View>
      <View style={{flexDirection:"row", margin:10}}>
      <Text style={styles.textstyle} onPress={()=> Actions.inactivestudent()}>
    
       Inactive Students</Text>

      <Text style={styles.textstyle} onPress={()=> Actions.inactiveteacher()}>
      inactive Teachers</Text>


      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  mycard:{
    marginRight:30,
    width:"50%",
    padding:10,
    height:"20%",
    borderRadius:5,
    shadowColor: "#fff",
    shadowOpacity:0.5,
    shadowRadius:5,

   
   
},
cardView:{
   flexDirection:"row",
   padding:5
  },
  textstyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 5,
    marginRight: 5,
    borderRadius:5,
    borderColor:"#333",
    borderWidth:1,
    padding:10,
    width:'50%'
    
  }
});
export default Principalscreen;

