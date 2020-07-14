import React, { useState, useEffect} from "react";
import { View, Picker, StyleSheet, Text,ScrollView,TouchableOpacity,AsyncStorage,Image
,SafeAreaView,
  StatusBar} from "react-native";
import { Button, Title, Card,IconButton,Colors,Modal,TextInput,
 Portal, Provider, Dialog ,RadioButton} from "react-native-paper";
import QRCode from 'react-qr-code';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Actions } from "react-native-router-flux";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Body, Header, Icon, Left, Right,DatePicker
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import axios from "axios";


export default function studentlist() {

    let [students, setStudents] = useState([]);

  useEffect(() => {
    getTeachers();
    getClasses();
    getSubjects();
  }, []);
      const [showDate, setDate] = useState(false);

  // const value = '';
  const mode = 'date';
  const displayFormat = 'DD/MM/YYYY';
  const [id,setid]=useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone] = useState("");
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [classname, setClassname] = useState('Class');
  const [subject, setSubject] = useState('Subject');
  const [picture, setPicture] = useState('');
  const [qualification, setQualification] = useState('');
  const [modal, setModal] = useState(false);
  let [loading, setLoading] = useState(false);
  let [classes, setClasses] = useState([]);
  let [subjects, setSubjects] = useState([]);

  const gallerypic = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        uploadimage(newfile);
      }
    } else {
      Alert.alert("No work");
    }
  };

  const uploadimage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "attendanceApp");
    data.append("cloud_name", "dbvq0lefw");
    fetch("https://api.cloudinary.com/v1_1/dbvq0lefw/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
      });
  };

 const showDateTimePicker = () => {
    //alert('showDateTimePicker');
    setDate(true);

    // Keyboard.dismiss();
  };

  const hideDateTimePicker = () => {
    setDate(false);
  };

  const handleDatePicked = (dob) => {
    setDob(dob);
    hideDateTimePicker();
  };
  const getClasses = () => {
    axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 11,
        }
      )
      .then((response) => {
        setClasses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
   const getSubjects = () => {
    axios
      .post('http://krishma.webcodice.com/react-native/axios.php', {
        request: 14,
      })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

   const updatedata=()=>{
    alert(`${name}:-user updated `);
    axios.post('http://krishma.webcodice.com/react-native/axios.php',{
         request:23,
          id: id,
          name: name,
          email: email,
          phone_no: phone_no,
          password: password,
          image: picture,
          gender: gender,
          dob: dob.toLocaleDateString(),
          class_name: classname,
          subject: subject,
          qualification: qualification,     
      })
      .then(response=>{
      getdata();
      hideModal();
      })
      .catch(error=>{
        console.log(error);
      })
  }
const [visible, setVisible] = useState(false);

  const showModal = (id,name,email,phone_no,password,image,gender,dob,subject,qualification,class_name) => {
     // console.log(class_name);

  setVisible(true);
  setid(id)
  setName(name)
  setEmail(email)
  setPhone(phone_no)
  setPassword(password)
  setPicture(image)
  setGender(gender)
  setDob(dob)
  setClassname(class_name)
  setSubject(subject)
  setQualification(qualification)
  }
  const hideModal = () => setVisible(false);
  useEffect(()=>{
    getTeachers();
  },[]);

   const deleteteacher= (username) =>{
 axios
      .post(
        "http://krishma.webcodice.com/react-native/axios.php",
        {
          request: 22,  // delete student from student list 
          role:'teacher',
          username:username,
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
          request: 16,//fetch all teacher in list
        }
      )
      .then((response) => {
        setStudents(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
//   const [name, setName] = useState('');
  
//   AsyncStorage.getItem("user").then((data) => {
//     // let user = data;
//     setName(data);
// })
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
<Title style={styles.welcome}>List of Teachers</Title>
{students.map((x) =>{
let {id,name,email,phone_no,password,username,image,gender,dob,class_name,subject,qualification} = x
return (
    <Card style={styles.mycard}
    key={id} >
    <View style={styles.cardView}>
         <TouchableOpacity onPress={()=>showModal(id,name,email,phone_no,password,image,gender,dob,subject,qualification,class_name)}>
         <Image
        style={{width:60,height:60,borderRadius:30}}
        source={image?{uri: image}:{uri: 'https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png'}}
        />
         </TouchableOpacity> 
        <View style={{marginLeft:10}}> 
            <Text style={styles.text}>{name}</Text>   
             <Text style={styles.text}>{email}</Text>  
             <Text style={styles.text}>{phone_no}</Text> 
             
             <Right>
             <Icon
                        ios="ios-trash"
                        android="md-close-circle"
                        style={{
                          fontSize: 30,
                          color: "#333",
                        }}
                        onPress={() => deleteteacher(username)}
                      />
             </Right>  
        </View>
    </View>
   </Card>
        )
    })}
  </View>
        </ScrollView>
 <Modal animationType="slide"
        transparent={false} visible={visible} onDismiss={hideModal}>
     <View style={{ margin:"4%", backgroundColor: 'white' }}>
    <ScrollView>
        <Title style={styles.welcome}>Update Teacher👨‍🎓</Title>
         <View style={{ margin: "4%" }}>
         <View style={{alignItems: "center",
                    justifyContent:"center"}}>
         <Image style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                  source={
                    picture
                      ? { uri: picture }
                      : {
                          uri:
                            "https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
                        }
                  }
                />
                <Text onPress={() => gallerypic()}>Edit</Text>
                </View>
       <TextInput
          style={styles.inputstyle}
          label="Name"
          value={name}
          mode="outlined"
          onChangeText={(text) => setName(text)}
          theme={mytheme}
        />
        <TextInput
          style={styles.inputstyle}
          label="Email"
          value={email}
          keyboardType="email-address"
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
          theme={mytheme}
        />
        <TextInput
          style={styles.inputstyle}
          label="Phone"
          value={phone_no}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setPhone(text)}
          theme={mytheme}
          />
           <TextInput
          style={styles.inputstyle}
          label="Password"
          value={password}
          mode="outlined"
          secureTextEntry={false}
          onChangeText={(text) => setPassword(text)}
          theme={mytheme}
        />
                <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 22 }}>Gender :</Text>
          <RadioButton
            style={styles.inputstyle}
            label="Gender"
            value={gender}
            mode="outlined"
            value="male"
            theme={mytheme}
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
          />
          <Text style={{ fontSize: 20, padding: 6 }}>Male</Text>
          <RadioButton
            style={styles.inputstyle}
            theme={mytheme}
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
          />
          <Text style={{ fontSize: 20, padding: 6 }}>Female</Text>
        </View>
       
        <Text
                  style={styles.datetextstyle}
                  onPress={() => showDateTimePicker()}
                  theme={mytheme}>
                  {dob ? moment(dob).format(displayFormat) : "Select Date"}
                </Text>
                <DateTimePicker
                  date={dob ? new Date(dob) : new Date()}
                  theme={mytheme}
                  isVisible={showDate}
                  mode={mode}
                  onConfirm={handleDatePicked}
                  onCancel={() => hideDateTimePicker()}
                />
        <Picker
          style={styles.pickerstyle}
          theme={mytheme}
          selectedValue={classname}
          onValueChange={(itemValue) => setClassname(itemValue)}>
          <Picker.Item label="Select Class" value="Class" />
          {classes.map((x) => (
            <Picker.Item
              key={x.class_id}
              label={x.class_name}
              value={x.class_name}
            />
          ))}
        </Picker>
        <Picker
          style={styles.pickerstyle}
          theme={mytheme}
          selectedValue={subject}
          onValueChange={(itemValue) => setSubject(itemValue)}>
          <Picker.Item label="Select Subject" value="Subject" />
          {subjects.map((x) => (
            <Picker.Item
              key={x.subject_id}
              label={x.subject_name}
              value={x.subject_name}
            />
          ))}
        </Picker>
        <TextInput
          style={styles.inputstyle}
          label="Qualification"
          value={qualification}
          mode="outlined"
          onChangeText={(text) => setQualification(text)}
          theme={mytheme}
        />           
      <Button mode="contained" 
       style={styles.inputstyle}
      theme={mytheme}
      onPress={()=>updatedata()} title='update'>
        Update
      </Button>
      <Button mode="contained" 
       style={styles.inputstyle}
      theme={mytheme}
     onPress={hideModal}  title='cancel'>
        Cancel
      </Button>
      </View>
      </ScrollView>
      </View>
      </Modal>
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

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight:'bold'
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