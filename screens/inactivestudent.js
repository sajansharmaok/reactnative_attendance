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

    let [students, setstudents] = useState([]);

  useEffect(() => {
    getstudents();
     }, []);
     
   const activestudent= (username,password) =>{
 axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 25,  // change inactive status to active  from student table 
          role:'student',
          username:username,
          password:password,
        }
      )
      .then((response) => {
        getstudents();
        alert(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });                                  
  };
  const getstudents = () => {
    axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 27,//fetch all student in list
        }
      )
      .then((response) => {
        setstudents(response.data);
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
    <Text style={{textAlign:'center', color:'#fff'}}>student Screen</Text>
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
<Title style={styles.welcome}>List of Inactive students</Title>
{students.map((x) => {
return (

<Card style={styles.mycard} key={x.id}>
<View style={styles.cardView}>
<TouchableOpacity
onPress={() =>
showModal(
x.name,
x.email,
x.phone_no,
x.image,
x.gender,
x.password,
x.father_name,
x.class_name,
x.roll_no,
x.id,
x.dob,
x.batch,
x.section,
x.registration
)
}
key={x.id}
>
<Image
style={{ width: 60, height: 60, borderRadius: 30 }}
source={
x.image
? { uri: x.image }
: {
uri:
"https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
}
}
/>
</TouchableOpacity>
<View style={{ marginLeft: 10 }}>
<Text style={styles.text}>{x.username}</Text>
<Text style={styles.textstyle}>{x.email}</Text>
<Text style={styles.textstyle}>{x.phone_no}</Text>
 <Right>
             <Icon
                        ios="ios-trash"
                        android="md-checkbox"
                        style={{
                          fontSize: 30,
                          color: "#333",
                        }}
                        onPress={() => activestudent(x.username,x.password)}
                      />
             </Right>  
</View>
</View>
</Card>

);
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
inputstyle: {
margin: 5,
},
scroll: {
width: "100%",
},
content: {
flex: 1,
justifyContent: "center",
// marginHorizontal: 10,
},
button: {
width: "60%",
paddingTop: 8,
marginTop: 10,
paddingBottom: 8,
backgroundColor: "#006aff",
marginBottom: 20,
},
mycard: {
margin: 5,
},
cardView: {
flexDirection: "row",
padding: 6,
},
text: {
fontSize: 18,
},
textstyle: {
fontSize: 14,
},
datetextstyle: {
margin: 5,
padding: 15,
borderRadius: 5,
borderColor: "grey",
borderWidth: 1,
color: "#333",
backgroundColor: "#f2f2f2",
},
welcome: {
fontSize: 20,
textAlign: "center",
margin: 10,
fontWeight: "bold",
},
centeredView: {
flex: 1,
// justifyContent: "center",
// alignItems: "center",
marginTop: 10,
},
modalView: {
margin: 20,
backgroundColor: "white",
borderRadius: 20,
padding: 35,
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},
openButton: {
backgroundColor: "#F194FF",
borderRadius: 20,
padding: 10,
elevation: 2,
margin: "4%",
},
pickerstyle: {
margin: 5,
padding: 15,
borderRadius: 5,
borderColor: "grey",
borderWidth: 1,
color: "grey",
backgroundColor: "#f2f2f2",
},
textStyle: {
color: "white",
fontWeight: "bold",
textAlign: "center",
},
modalText: {
marginBottom: 15,
textAlign: "center",
},
SwipeableContainer: {
width: 100,
marginRight: "10%",
},
});