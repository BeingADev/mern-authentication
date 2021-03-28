const Input = ({ icon, name, ...rest }) => {
	return (
		<div className='group'>
			<i className={icon}></i>
			<input {...rest} name={name} className='formLabel' />
		</div>
	);
};

export default Input;
