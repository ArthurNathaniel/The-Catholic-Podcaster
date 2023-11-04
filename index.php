<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css">
    <style>

    </style>
</head>

<body>
    <div class="header">
        <div class="title">
            <p>The Catholic Podcaster</p>
        </div>
        <div class="slogan">
            <p>Understanding Catholicism</p>
        </div>
    </div>

    <div class="container">
        <div class="circle" id="progressCircle">00:00</div>
        <audio controls id="audio" style="display:none;"></audio>
        <button id="playButton" style="display:none;"><i class="fas fa-play"></i></button>
    </div>

    <div class="footer">
        <button id="recordButton"><i class="fas fa-microphone"></i></button>
        <button id="stopButton"><i class="fas fa-stop"></i></button>
        <button id="saveButton"><i class="fas fa-save"></i></button>
        <button id="deleteButton"><i class="fas fa-trash"></i></button>
    </div>

    <script src="./javascript/app.js">
      
    </script>
</body>

</html>