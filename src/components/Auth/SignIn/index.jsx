// Core
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';
// Instruments
import { useForm } from 'react-hook-form';
// Validation
import { validSchema } from '../validation';
// Actions
import { authActions } from '../../../actions';
// Styles
import Styles from './styles.module.scss';
// Components
import { TextField, SubmitBtn, Loader } from '../../Reusable';

export const SignIn = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.general.loading);

    const navigate = useNavigate();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode:          'onBlur',
        resolver:      validSchema('signin'),
        defaultValues: {
            email:    '',
            password: '',
        },
    });

    const onFormSubmit = (values) => {
        dispatch(authActions.signIn(values, navigate));
    };

    return (
        <form onSubmit = { handleSubmit(onFormSubmit) } className = { Styles.container }>
            <TextField
                name = { 'email' }
                label = { 'Пошта' }
                required = { true }
                error = { errors.email }
                register = { register } />
            <TextField
                name = { 'password' }
                label = { 'Пароль' }
                required = { true }
                error = { errors.password }
                register = { register } />
            {
                loading
                    ? <Loader class = { Styles.loader } />
                    : <SubmitBtn
                        name = { 'Sign in' }
                        disabled = { !isValid }
                        class = { Styles.submit_btn } />
            }
        </form>
    );
};
