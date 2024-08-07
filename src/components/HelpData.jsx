//Switch off the studio in production mode

if (process.env.NODE_ENV === 'development') {
  studio.initialize()
}

//To hide the UI push "Option + \" on your keyboard
