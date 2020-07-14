<?php
    include "config.php";

    $data = json_decode(file_get_contents("php://input"));

    $request = $data->request;

    // Fetch All Students
    // if($request == 1){
    //     $userData = mysqli_query($con,"select * from react_native_student order by id asc");

    //     $response = array();
    //     while($row = mysqli_fetch_assoc($userData)){
    //         $response[] = $row;
    //     }

    //     echo json_encode($response);
    //     exit;
    // }
    // // Fetch All Teachers
    // if($request == 2){
    //     $userData = mysqli_query($con,"select * from react_native_teacher order by id asc");

    //     $response = array();
    //     while($row = mysqli_fetch_assoc($userData)){
    //         $response[] = $row;
    //     }
    //     echo json_encode($response);
    //     exit;
    // }
    // Fetch All Users
    if($request == 3){
        $userData = mysqli_query($con,"SELECT * from react_native_user order by id asc");

        $response = array();
        while($row = mysqli_fetch_assoc($userData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }

    // Add Student
    // 15 feildes for student registration
    if($request == 4){
        $name = $data->name;
        $email = $data->email;
        $phone_no = $data->phone_no;
        $password = $data->password;
        $image = $data->image;
        $username = $data->username;
        $gender = $data->gender;
        $dob = $data->dob;
        $roll_no = $data->roll_no;
        $batch = $data->batch;
        $class_name = $data->class_name;
        $section = $data->section;
        $registration  = $data->registration;
        $father_name  = $data->father_name;
        
        $userData = mysqli_query($con,"SELECT * FROM react_native_user WHERE username='".$username."'");
        if(mysqli_num_rows($userData) == 0){
            $status = mysqli_query($con,"INSERT INTO react_native_student(name,email,phone_no,password,image,username,gender,dob,roll_no,batch,class_name,section,registration,father_name) VALUES('".$name."','".$email."','".$phone_no."','".$password."','".$image."','".$username."','".$gender."','".$dob."','".$roll_no."','".$batch."','".$class_name."','".$section."','".$registration."','".$father_name."')");
            if($status == 1){
                mysqli_query($con,"INSERT INTO react_native_user(username,password,role,token) VALUES('".$username."','".$password."','student','0')");
                echo 'Student Added';
            }
        }else{
            echo "username already exists.";
        }      
        exit;
    }
    // Add teacher
    // 11 feildes for teacher registration
    if($request == 5){
        $name = $data->name;
        $email = $data->email;
        $phone_no = $data->phone_no;
        $password = $data->password;
        $image = $data->image;
        $username = $data->username;
        $gender = $data->gender;
        $dob = $data->dob;
        $class_name = $data->class_name;
        $subject = $data->subject;
        $qualification  = $data->qualification;

        $userData = mysqli_query($con,"SELECT * FROM react_native_user WHERE username='".$username."'");
        if(mysqli_num_rows($userData) == 0){
            $status = mysqli_query($con,"INSERT INTO react_native_teacher(name,email,phone_no,password,image,username,gender,dob,class_name,subject,qualification,status) VALUES('".$name."','".$email."','".$phone_no."','".$password."','".$image."','".$username."','".$gender."','".$dob."','".$class_name."','".$subject."','".$qualification."','active')");
            if($status == 1){
                mysqli_query($con,"INSERT INTO react_native_user(username,password,role,token) VALUES('".$username."','".$password."','teacher', '0')");
                echo 'Teacher Added';
            }
        }else{
            echo "username already exists.";
        }
        exit;
    }
    // login user
    if($request == 6){
        $username = $data->username;
        $password = $data->password;

        $userData = mysqli_query($con,'SELECT * FROM react_native_user WHERE username="'.$username.'" and password="'.$password.'"');
        
        if(mysqli_num_rows($userData) > 0){
            $response = array();

            while($row = mysqli_fetch_assoc($userData)){
                $response[] = $row;
            }
            echo json_encode($response);
        }else{
           echo "User not valid";
        }
        exit;
    }    
    // Delete Customer
    if($request == 7){
        $id = $data->id;
        $role = $data->role;
        $username = $data->username;
        echo $username;
        $status = mysqli_query($con,"DELETE FROM react_native_user WHERE id=".$id);
        if($status == 1){
            if($role == 'student'){
                mysqli_query($con,"DELETE FROM react_native_student WHERE username='".$username."'");
                echo 'Student Deleted';
            }else if($role == 'teacher'){
                mysqli_query($con,"DELETE FROM react_native_teacher WHERE username='".$username."'");
                echo 'Teacher Deleted';
            }
        }
    }
    //Add New Class
    if($request == 9){
        $class_name = $data->class_name;
        $section= $data->section;
        $batch= $data->batch;
        $subject_code = $data->subject_code;

        $classData = mysqli_query($con,"SELECT * FROM react_native_class WHERE class_name='".$class_name."'");
        if(mysqli_num_rows($classData) == 0){
            $status = mysqli_query($con,"INSERT INTO react_native_class(class_name,section,batch,subject_code) VALUES('".$class_name."','".$section."','".$batch."','".$subject_code."')");
            
                echo 'Class Added';
           
        }else{
            echo "Class Name already exists.";
        }
        exit;
    } 

// Fetch All students
    if($request == 10){
        $studentData = mysqli_query($con,"SELECT * from react_native_student WHERE status='active' order by id asc");

        $response = array();
        while($row = mysqli_fetch_assoc($studentData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }

    // Fetch All Classes
    if($request == 11){
        $classData = mysqli_query($con,"SELECT * from react_native_class");

        $response = array();
        while($row = mysqli_fetch_assoc($classData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }

    
    // Fetch Single User
    if($request == 12){
        $username = $data->username;
        $classData = mysqli_query($con,"SELECT * FROM react_native_student WHERE username='".$username."'");

        $response = array();
        while($row = mysqli_fetch_assoc($classData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }
    //Add Subject
    if($request == 13){
        $subject_name = $data->subject_name;
        $subject_code = $data->subject_code;

        $classData = mysqli_query($con,"SELECT * FROM react_native_subject WHERE subject_name='".$subject_name."'");
        if(mysqli_num_rows($classData) == 0){
            $status = mysqli_query($con,"INSERT INTO react_native_subject(subject_name,subject_code) VALUES('".$subject_name."','".$subject_code."')");
            
                echo 'Subject Added';
           
        }else{
            echo "Subject Name already exists.";
        }
        exit;
    } 
    // Fetch All subjects
    if($request == 14){
        $subjectData = mysqli_query($con,"SELECT * from react_native_subject");

        $response = array();
        while($row = mysqli_fetch_assoc($subjectData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }
    //Insert Qr generator data
    if($request == 15){
        
        $teacher = $data->teacher;
        $class_name= $data->class_name;
        $section= $data->section;
        $subject = $data->subject;
        $date_time = $data->date_time;

        $classData = mysqli_query($con,"SELECT * FROM react_native_qr_code_generate WHERE date_time='".$date_time."'");
        if(mysqli_num_rows($classData) == 0){
            $status = mysqli_query($con,"INSERT INTO react_native_qr_code_generate(teacher, class_name,section,subject,date_time) VALUES('".$teacher."','".$class_name."','".$section."','".$subject."','".$date_time."')");
            
                echo 'QR Generated Successfully';
           
        }else{
            echo "QR already exists.";
        }
        exit;
    }
    // Fetch All teachers
    if($request == 16){
        $teacherData = mysqli_query($con,"SELECT * from react_native_teacher WHERE status='active' order by id asc");

        $response = array();
        while($row = mysqli_fetch_assoc($teacherData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }
    //Insert Qr scan data
    if($request == 17){
        
        $qrlink = $data->data;
        $username= $data->name;
      

     $status = mysqli_query($con,"INSERT INTO react_native_qr_scan(qrlink, username) VALUES('".$qrlink."','". $username."')");
            
                echo 'QR Scanned Successfully, Your Attendance Marked'.$qrlink.'and' .$username;
           
     
        exit;
    }
    if($request == 18){
        
        $teacherData = mysqli_query($con,"SELECT * from react_native_qr_scan");

        $response = array();
        while($row = mysqli_fetch_assoc($teacherData)){
            $response[] = $row;
        }

        echo json_encode($response); 
     
        exit;
    }
    // Update Customer
    if($request == 8){
        $id = $data->id;
        $username = $data->username;
        $password = $data->password;
        mysqli_query($con,"UPDATE react_native_user SET username='".$username."',password='".$password."' WHERE id=".$id);
    }
    //update single student data
    if($request == 19)
      {
        $id = $data->id;
        $name = $data->name;
        $email = $data->email;
        $phone_no = $data->phone_no;
        $password = $data->password;
        $image = $data->image;
        // $username = $data->username;
        $gender = $data->gender;
        $dob = $data->dob;
        $roll_no = $data->roll_no;
        $batch = $data->batch;
        $class_name = $data->class_name;
        $section = $data->section;
        $registration  = $data->registration;
        $father_name  = $data->father_name;
         $userData = mysqli_query($con,"SELECT * FROM react_native_user WHERE username='".$username."'");
        if(mysqli_num_rows($userData) == 0)
        {
            $status = mysqli_query($con,"UPDATE react_native_student SET name='".$name."',email='".$email."',phone_no='".$phone_no."',password='".$password."',image='".$image."',gender='".$gender."',dob='".$dob."',roll_no='".$roll_no."',batch='".$batch."',class_name='".$class_name."',section='".$section."',registration='".$registration."',father_name='".$father_name."' WHERE id=".$id);
            // if($status == 1){
            //     mysqli_query($con,"UPDATE react_native_user SET username='".$username."',password='".$password."',role='student'");
                 echo " Student Data Updated Successfully";
            // }
        }else{
            echo "username already exists.";
        }      
        exit;
        // mysqli_query($con,"UPDATE react_native_student SET name='".$name."',email='".$email."',phone_no='".$phone_no."'
        // ,password='".$password."',image='".$image."',username='".$username."',gender='".$gender."',dob='".$dob."',roll_no='".$roll_no."',batch='".$batch."',class_name='".$class_name."',section='".$section."',registration='".$registration."',father_name='".$father_name."' WHERE id=".$id);
        // echo "Update Successfully";
        // exit;
    }
        // Auto login user
    if($request == 20){
        $token = $data->token;

        $userData = mysqli_query($con,'SELECT * FROM react_native_user WHERE token="'.$token.'"');
        if(mysqli_num_rows($userData) > 0){
            $response = array();

            while($row = mysqli_fetch_assoc($userData)){
                $response[] = $row;
            }
            echo json_encode($response);
        }else{
            echo "User not valid";
        }
        exit;
    }  
//view all qr
    if($request == 21){
        
        $qrgenerateData = mysqli_query($con,"SELECT * FROM react_native_qr_code_generate");

        $response = array();
        while($row = mysqli_fetch_assoc($qrgenerateData)){
            $response[] = $row;
        }

        echo json_encode($response); 
     
        exit;
    }
//delete student OR TEACHER
    if($request == 22){
        $role = $data->role;
        $username = $data->username;
        $status = mysqli_query($con,"DELETE FROM react_native_user WHERE username='".$username."' AND role ='".$role."' ");
        if($status == 1){
            if($role == 'student'){
                mysqli_query($con,"UPDATE react_native_student SET status='inactive' WHERE username='".$username."'");
                echo 'Student Deleted';
            }
            else if($role == 'teacher'){
                mysqli_query($con,"UPDATE react_native_teacher SET status='inactive' username='".$username."'");
                echo 'Teacher Deleted';
            }
        }
    }
   //  update single teacher data
   if($request == 23){
    $id = $data->id;
    $name = $data->name;
    $email = $data->email;
    $phone_no = $data->phone_no;
    $password = $data->password;
    $image = $data->image;
    $gender = $data->gender;
    $dob = $data->dob;
    $class_name = $data->class_name;
    $subject = $data->subject;
    $qualification  = $data->qualification;

    $userData = mysqli_query($con,"SELECT * FROM react_native_user WHERE username='".$username."'");
    if(mysqli_num_rows($userData) == 0){
        $status = mysqli_query($con,"UPDATE react_native_teacher SET name='".$name."',email='".$email."',phone_no='".$phone_no."',password='".$password."',image='".$image."',gender='".$gender."',dob='".$dob."',class_name='".$class_name."',subject='".$subject."',qualification='".$qualification."' WHERE id=".$id);
        // if($status == 1){
        //     mysqli_query($con,"INSERT INTO react_native_user(username,password,role) VALUES('".$username."','".$password."','teacher')");
            echo 'Teacher Added';
        // }
    }else{
        echo "username already exists.";
    }
    exit;
}
        // Fetch Single Teacher
        if($request == 24){
            $username = $data->username;
            $classData = mysqli_query($con,"SELECT * FROM react_native_teacher WHERE username='".$username."'");
    
            $response = array();
            while($row = mysqli_fetch_assoc($classData)){
                $response[] = $row;
            }
    
            echo json_encode($response);
            exit;
        }

//status change to active from inactive in student table 
    if($request == 25){
        $role = $data->role;
        $username = $data->username;
        $password =$data->password;
        $status = mysqli_query($con,"UPDATE react_native_student SET status='active' WHERE username='".$username."'");
        if($status == 1)
        {
           mysqli_query($con,"INSERT INTO react_native_user(username,password,role,token) VALUES('".$username."','".$password."','student', '0')");
                echo 'Student Status Changed to Active';
        }
    }
        //status change to active from inactive in teacher table 
    if($request == 26){
        $role = $data->role;
        $username = $data->username;
        $password =$data->password;
        $status = mysqli_query($con,"UPDATE react_native_teacher SET status='active' WHERE username='".$username."'");
        if($status == 1)
        {   
           mysqli_query($con,"INSERT INTO react_native_user(username,password,role,token) VALUES('".$username."','".$password."','teacher', '0')");
                echo 'Teacher Status Changed to Active';
        }
    }
 // Fetch All inactive student
    if($request == 27){
        $studentData = mysqli_query($con,"SELECT * from react_native_student WHERE status='inactive' order by id asc");

        $response = array();
        while($row = mysqli_fetch_assoc($studentData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }
    // Fetch Allinactive teachers
    if($request == 28){
        $teacherData = mysqli_query($con,"SELECT * from react_native_teacher WHERE status='inactive' order by id asc");

        $response = array();
        while($row = mysqli_fetch_assoc($teacherData)){
            $response[] = $row;
        }

        echo json_encode($response);
        exit;
    }


?>