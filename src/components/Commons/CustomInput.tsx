import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputHTMLAttributes, useState } from 'react';
import useStyles from '../../styles/commons/CustomInput';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: any;
}

function CustomInput(props: CustomInputProps) {
	const classes = useStyles();
	const { icon: Icon, type = 'text', ...inputProps } = props;
	const [inputType, setInputType] = useState<string>(type);

	return (
		<div className={`${classes.inputGroup} flex-center-ver`}>
			{Icon && (
				<div className={`${classes.inputIcon} h-100 flex-center`}>
					<Icon className={classes.icon} />
				</div>
			)}

			<input
				className={`${classes.input} wh-100`}
				type={inputType}
				{...inputProps}
			/>

			{type === 'password' && (
				<>
					{inputType === 'password' ? (
						<VisibilityOffIcon
							className={classes.passwordIcon}
							onClick={() => setInputType('text')}
						/>
					) : (
						<VisibilityIcon
							className={classes.passwordIcon}
							onClick={() => setInputType('password')}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default CustomInput;
