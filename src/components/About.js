import React from 'react'

export default function About(props) {
 
const linestyle={
  textAlign:'justify'
  }

  return (
    <div className='container my-2 mb-5' style={{ color: `${props.mode === "dark" ? "black" : "white"}` ,minHeight:'100vh'}}>
      <h1 className='text-center'>About</h1>
<p style={linestyle}>Welcome to iNotebook - a revolutionary note-taking application designed to elevate your productivity and organization to new heights. In today's fast-paced world, staying on top of your tasks, ideas, and important information can be a challenge. That's where iNotebook comes to your rescue, offering a seamless and intuitive platform for capturing, organizing, and accessing your notes anytime, anywhere.</p>
<br></br>
<h3>A Seamless Journey - Introducing iNotebook :</h3>
<p style={linestyle}>From the moment you step into the world of iNotebook, you'll be captivated by its clean and user-friendly interface. Our team of dedicated developers and designers has poured countless hours into crafting an application that ensures a seamless journey for both novice and seasoned users. Whether you're a student, a professional, or a creative soul, iNotebook has something special for everyone.</p>
<br></br>
<h3>Personalization at Your Fingertips :</h3>
<p style={linestyle}>One of the standout features of iNotebook is its exceptional personalization options. Customizing your notes to suit your preferences is a breeze. Tailor your notes with different themes, colors, and fonts, allowing you to express your individuality while staying organized and focused.</p>
<br></br>
<h3>A Safe Haven for Your Thoughts :</h3>
<p style={linestyle}>At iNotebook, we understand the value of your privacy and sensitive information. Rest assured that your notes are securely stored, with advanced encryption measures in place to keep your data safe from prying eyes. We take your trust in us very seriously, and we're committed to maintaining the highest standards of security.</p>
<br></br>
<h3>Collaboration Redefined :</h3>
<p style={linestyle}>In a world where collaboration is key, iNotebook stands out with its collaborative features. Share your notes with colleagues, friends, or family, and work together in real-time. Seamlessly brainstorm ideas, edit content, and provide feedback, regardless of where you are - iNotebook fosters collaboration like never before.</p>
<br></br>
<h3>The Power of Organization :</h3>
<p style={linestyle}>Tame the chaos of multiple projects and tasks with iNotebook's powerful organizational tools. Create folders, tags, and labels to categorize your notes efficiently. Say goodbye to the days of frantically searching for that important piece of information - iNotebook puts everything at your fingertips.</p>
<br></br>
<h3>Embracing Versatility :</h3>
<p style={linestyle}>iNotebook transcends traditional note-taking applications. Beyond textual notes, the platform accommodates images, audio, video, and sketches. Capture inspiration as it strikes, with no limits to your creativity.</p>
<br></br>
<h3>Your Notes, Your Way - On Any Device :</h3>
<p style={linestyle}>Life is constantly on the move, and so are you. That's why iNotebook ensures your notes are accessible from any device, be it your smartphone, tablet, or desktop. Seamlessly synchronize your data across devices, so you can pick up right where you left off.</p>
    </div>
  )
}
