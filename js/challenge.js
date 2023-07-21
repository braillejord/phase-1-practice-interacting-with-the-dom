// See the timer increment every second once the page has loaded.
const timer = document.getElementById('counter')
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')
const likeButton = document.getElementById('heart')


const changeCounter = (addOrRemove) => {
    const counterNumber = parseInt(timer.innerText)
    if (addOrRemove === 'add') {
        timer.innerText = counterNumber + 1;
    } else {
        timer.innerText = counterNumber - 1;
    }
}
let startCounter = setInterval(() => changeCounter("add"), 1000)

// Main functions
changeWithButtons()
pauseCounter()


// Manually increment/decrement using the plus and minus buttons.
function changeWithButtons() {
    plus.addEventListener("click", () => changeCounter("add"))
    minus.addEventListener("click", () => changeCounter("remove"))
}


// "Like" an individual number of the counter
likeButton.addEventListener("click", addOrUpdateLikes)

//Show count of number of "likes" associated w/ specific number
function addOrUpdateLikes() {
    //grab current counter number
    const timerNum = parseInt(timer.innerText);
    
    //grab container of like messages
    const likeContainer = document.getElementById('likes');
    
    //get last like message
    const lastLike = likeContainer.lastChild;
    //string operations to pull out the current counter and number of likes from the message
    const lastLikeCounterNum = parseInt(lastLike?.innerText.split(" ")[0]);
    const lastLikeNumLikes = parseInt(lastLike?.innerText.split(" ").at(-2));
    
    //if message counter number is the same as the current counter number....
    if (timerNum === lastLikeCounterNum) {
        //update the last message with new data
        lastLike.innerText = `${timerNum} has been liked ${lastLikeNumLikes + 1} times!`;
    } else {
        //else if we're not updating the message, just create and add a new one
        const message = document.createElement('li');
        message.innerText = `${timer.innerText} has been liked 1 time!`;
        likeContainer.appendChild(message);
    }
}

//Pause the counter (pause counter, disable all buttons, switch from pause to resume)
function pauseCounter() {
    const pauseButton = document.getElementById('pause')
    pauseButton.addEventListener("click", () => {
        if (pauseButton.innerText === "pause") {
            pauseButton.innerText = "resume"
            clearInterval(startCounter)
            plus.disabled = true
            minus.disabled = true
            likeButton.disabled = true
            
        } else {
            pauseButton.innerText = "pause"
            plus.disabled = false
            minus.disabled = false
            likeButton.disabled = false
            startCounter = setInterval(() => changeCounter("add"), 1000)

        }
    })
}
