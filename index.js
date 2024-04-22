let express = require('express');
let app = express();
app.use("/assets", express.static(__dirname + "/assets"));
app.get('/', (req, res)=>{
    res.send(`<!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Ambersys Files</title>
    <link rel="icon" type="image/x-icon" href="/assets/logo.png">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Inter:wght@300&family=Work+Sans:wght@400;500&display=swap');
      body, div, h1, input, button {

        font-family:'Inter', sans-serif;
      }
    </style>
  </head>

  <body style='text-align: center; '>
    <div id='header' style='text-align:left; width:100%; height:4vh; background-color:#242526ff;outline: 10px solid #242526ff;vertical-align: top;'>
      <img style='height:3vh; width:3vh; margin-top:0.5vh; margin-left:1vw;' src='/assets/logo.png'>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <span style="height:4vh;color:white; font-size:3vh;line-height: 4vh;"><b>Ambersys Files</b></span>
    </div>
      <div id='spacer' style='height:6vh' >

      </div>
      <div id='viewer' style='text-align:center;width:80%; margin-left: auto;
        margin-right: auto; align-items: center; align-content: center;'>
        Use standard file link
      </div>
    <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="41ly3tw2brykru7"></script>
  </body>

  </html>`)
})
app.get('/:src/:id', (req, res) =>{
  let src=req.params.src
  let id = req.params.id
  let viewer = ''
  if(id && src){
    if(src=="db"){
      id=atob(id)
      viewer=`<a 
        href="https://www.dropbox.com/${id}" 
        class="dropbox-embed" data-height="80vh"
        data-width="80vw"
      ></a>`
    } else if(src=="gh"){
      let filepath = btoa(id)
      if(filepath.startsWith('/')){
        filepath = filepath.slice(1)
      }
      viewer=`<iframe src="https://raw.githubusercontent.com/${filepath}"</iframe>`

    } else {
        viewer=`<h1>Error: Provide Valid Source</h1>`
    }
  } else {
    viewer=`<h1>Error: Provide File ID and Source</h1>`
  }
  res.send(`<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Ambersys Files</title>
  <link rel="icon" type="image/x-icon" href="/assets/logo.png">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa&family=Inter:wght@300&family=Work+Sans:wght@400;500&display=swap');
    body, div, h1, input, button {

      font-family:'Inter', sans-serif;
    }
  </style>
</head>

<body style='text-align: center; '>
  <div id='header' style='text-align:left; width:100%; height:4vh; background-color:#242526ff;outline: 10px solid #242526ff;vertical-align: top;'>
    <img style='height:3vh; width:3vh; margin-top:0.5vh; margin-left:1vw;' src='/assets/logo.png'>
  <span>&nbsp;&nbsp;&nbsp;</span>
  <span style="height:4vh;color:white; font-size:3vh;line-height: 4vh;"><b>Ambersys Files</b></span>
  </div>
    <div id='spacer' style='height:6vh' >
      
    </div>
    <div id='viewer' style='text-align:center;width:80%; margin-left: auto;
      margin-right: auto; align-items: center; align-content: center;'>
      ${viewer}
    </div>
  <script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="41ly3tw2brykru7"></script>
</body>

</html>`)
})
app.listen(3000)

  



