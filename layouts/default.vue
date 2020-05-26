<template>
  <div>
    
   <b-navbar toggleable type="light" variant="faded" >
      <b-img
      center
        src="../images/logo2.png"
        fluid
        alt="Center image"
        width="300px"
        
      ></b-img>



    </b-navbar>
   

    <nuxt />
  </div>
</template>

<style>
     
    .dropdown-item:active{
        background: #DC3546;    
    }
    
    html {
      font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 16px;
      word-spacing: 1px;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      margin: 0;
    }
    .button--green {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #3b8070;
      color: #3b8070;
      text-decoration: none;
      padding: 10px 30px;
    }
    .button--green:hover {
      color: #fff;
      background-color: #3b8070;
    }
    .button--grey {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #35495e;
      color: #35495e;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }
    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
    .a :hover{
      
      background: #DC3546;
    }
    body{
  
    background-image: url("../images/img2.jpg");
  background-repeat: no-repeat;
  background-size: cover; 
    }
    .margin{
  margin-right: 20px;
}
.bcard {
  text-align: center;
  margin-top: 30px;
  background-color: #f8fdff;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  -webkit-box-shadow: -7px 7px 26px 0px #0044ff;
  -moz-box-shadow: -7px 7px 26px 0px #0044ff;
  box-shadow: 7px 7px 26px 7px #b8e0fe;
}
</style>