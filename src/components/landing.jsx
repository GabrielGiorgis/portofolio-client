import {React, useRef, useState, useEffect} from 'react';
import worksData from '../../data/worksData.json'; import tecnologiesData from '../../data/tecnologiesData.json'; //Data
import '../style-sheets/style-landing.css'; import '../style-sheets/style-responsive.css'; import '../style-sheets/typewriter.css'; // Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faBars, faHome, faUser, faLaptop, faSpinner } from '@fortawesome/free-solid-svg-icons'; //Icons from fontawesome

function Title(){
// Functions to show and hide form
	function showForm(){
		const form = document.getElementById('form');
		form.classList.toggle('show');
	}
	function hideForm(){
		const form = document.getElementById('form');
		form.classList.remove('show');
		setIfFormSent(false);
		setSuccesMessage(''); 
	}
// Send form functions
	const emailRef = useRef();
	const nameRef = useRef();
	const messageRef = useRef();
	const subjectRef = useRef();
	// Message status
	const [ifFormSent, setIfFormSent] = useState(false);
	const [succesMessage, setSuccesMessage] = useState(false);
	const [loading, setLoading] = useState(false);

	// Conection with server and send email
	const sendMail = async (dataForm) => {
		try {
			//Success Mesagge set Off
			setSuccesMessage('');
			//Loading message set on
			setLoading(true);
			//Send email
			const response = await fetch('https://wakeful-hill-lyric.glitch.me/mail',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataForm)
			});
			if(!response.ok){
				throw new Error('Error en la solicitud del servidor');
			}
			//Loading message set off
			setLoading(false);

			//Show succes message
			setIfFormSent(true);
			setSuccesMessage('Mail sent correctly, I will contact you shortly.'); 

			//Reset form
			emailRef.current.value = '';
			nameRef.current.value = '';
			messageRef.current.value = '';
			subjectRef.current.value = '';
		} catch (error) {
			console.log('Error al enviar el correo ',error);
		}
	}
	// Function to send email
	const handleSubmit = (e) => {
		e.preventDefault();
		const mail = emailRef.current.value;
		const name = nameRef.current.value;
		const message = messageRef.current.value;
		const subject = subjectRef.current.value;
		if(!mail || !name || !message || !subject){
			alert('All fields are required 😢');
		} else (
			sendMail({mail, name, subject ,message})
		)
	};

	return (
		<div id='title' className='title-content'>
			<div className='text'>
				<div className='title'>
					<p>Hi, I'm</p>
					<div className='inner-title'>
						<h1>Full Stack Developer</h1>
					</div>
				</div>
				<div className='description'>
					<button className='button' onClick={showForm}>Get in touch</button>
					<p>23 years old student from Argentina</p>
				</div>
			</div>
			<div className='image'>
				<img src={'/assets/image.png'} alt='hero' />
			</div>
			{/* Form */}
			<div id='form' className='contact-form'>
				<div className='close'>
					<button className='button' onClick={hideForm}>X</button>
				</div>
				<form>
					
					<input ref={nameRef} type='text' placeholder='Name'/>
					<input ref={emailRef} type='text' placeholder='Email'/>
					<input ref={subjectRef} type='text' placeholder='Subject'/>
					<textarea ref={messageRef} placeholder='Message'></textarea>
					{!loading && <button className='button' onClick={handleSubmit}>Send</button> }
					{/* {loading && <p className='loading-icon'><FontAwesomeIcon icon={faSpinner} spinPulse /><span>sending</span></p>} */}
					{loading && <p className='loading-icon'>
					<div class="typewriter">
    					<div class="slide"><i></i></div>
    					<div class="paper"></div>
    					<div class="keyboard"></div>
					</div><span>sending</span></p>}
					{ifFormSent && <p className='successMessage'>{succesMessage}</p>}
				</form>
			</div>
			<div class="custom-shape-divider-bottom-1707147888">
				<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
					<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
					<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
				</svg>
			</div>
		</div>
	)
}
function Works(){
	const works = worksData;
	return (
		<div id='works' className='works-container'>
			<div className='works'>
				{works.map((work, index) => (
					<div key={index} className='work-item'>
						<div className='work-image'>
							<a href={work.link} target='_blank' rel='noreferrer'><img src={work.image} alt={`Work titled ${work.title}`} /></a>
						</div>
						<div className='work-info'>
							<h3>{work.title}</h3>
							<p>{work.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function About(){
	useEffect(() => {
		filterTecnologies('front');
	}, []);
	function filterTecnologies(selectedClass) {
	  const tecnologiesDivs = document.querySelectorAll('.tecnologies div');
	  tecnologiesDivs.forEach(div => {
	    if (div.classList.contains(`tecnology-${selectedClass}`)) {
	      div.style.display = ''; // Show the div with matching class
	    } else {
	      div.style.display = 'none'; // Hide other divs
	    }
	  });
	}
	return (
	<div id='about' className='about'>
		<div className='about-text'>
	  		<p>Efficiency, speed and perfection in my projects.<br />
	  		I think that the feedback with the client is the most important in this field.</p>
		</div>
	  	<div className='tecnologies-container'>
			<h3>Tecnologies</h3>
			<div className='filter'>
				<button id='button-front' className='button' onClick={() => filterTecnologies('front')}>FRONT</button>
				<button id='button-back' className='button' onClick={() => filterTecnologies('back')}>BACK</button>
				<button id='button-tool' className='button' onClick={() => filterTecnologies('tool')}>TOOLS</button>
			</div>
			<div className='tecnologies'>
				{tecnologiesData.map((tecnology, index) => (
				<div key={index} className={"tecnology-"+tecnology.class}>
					<img src={tecnology.image} alt={tecnology.title} />
					<p>{tecnology.title}</p>
				</div>
				))}
			</div>
		</div>
	</div>
  );
}
function Header(){
	function showForm(){
		const form = document.getElementById('deploy');
		form.classList.toggle('show');
	}
	function hideForm(){
		const form = document.getElementById('deploy');
		form.classList.remove('show');
	}
	return(
		<div className='header'>
			<div className='title-header'>
				<p>PORTFOLIO</p>
			</div>
			<div className='menu'>
				<ul className='menu-pc'>
					<li><a href='#title'>Home</a></li>
					<li><a href='#works'>Works</a></li>
					<li><a href='#about'>About</a></li>
				</ul>
				<button onClick={showForm}><FontAwesomeIcon className='bars' icon={faBars} /></button>
			</div>
			<div id='deploy' className='deploy'>
				<div className='deploy-menu'>
					<ul>
						<li><a href='#title' onClick={hideForm}><FontAwesomeIcon className='icon' icon={faHome} />Home</a></li>
						<li><a href='#works' onClick={hideForm}><FontAwesomeIcon className='icon' icon={faLaptop} />Works</a></li>
						<li><a href='#about' onClick={hideForm}><FontAwesomeIcon className='icon' icon={faUser} />About</a></li>
					</ul>
				</div>
			</div>
		</div>

	);
}
function Footer(){
	return (
		<div className='footer'>
			<div className='social'>
				<ul>
					<li><a target='_blank' href='https://www.linkedin.com/in/gabriel-giorgis/'><img src={'/assets/logos/linkedin.png'} alt='linkedin' /></a></li>
					<li><a target='_blank' href='https://github.com/GabrielGiorgis'><img src={'/assets/logos/github.png'} alt='github' /></a></li>
				</ul>
			</div>
			<p>© 2024 Gabriel Giorgis</p>
			<div className='contact'>
				<ul>
					<li><a target='_blank' href='mailto:gabrielgiorgis.dev@gmail.com'><img src={'/assets/logos/gmail.png'} alt='gmail' /></a></li>
					<li><a target='_blank' href='https://wa.me/5492615617614?text=Hola,%20quisiera%20consultar%20sobre%20sus%20servicios%20y%20presupuestos.%20¡Gracias%20y%20espero%20tu%20respuesta!'><img src={'/assets/logos/whatsapp.png'} alt='wsp' /></a></li>
				</ul>
			</div>
		</div>
	)
}

export default function Landing(){
	return (
		<div className='landing'>
			<Header />
			<Title />
			<Works />
			<About />
			<Footer />
		</div>
	)
}

/* FUNCIONES */
