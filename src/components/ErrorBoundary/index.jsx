// Instruments
import { ErrorBoundary } from 'react-error-boundary';
// Routing
import { useNavigate } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';

const ErrorView = () => {
    const navigate = useNavigate();

    const onBack = () => {
        navigate('/');
    };

    return <section id = { 'error_boundary' } className = { Styles.container }>
        <div className = { Styles.error_info }>
            <span>{ 'Сталася загадкова 👽помилка 📛' }</span>
            <span>{ 'Наша космічна 🛰 команда інженерів 👩🏼‍🚀👨🏼‍🚀 вже працює, щоб виправити це за вас!' }</span>
            <span onClick = { onBack }>{ 'Повернутися на головну сторінку' }</span>
        </div>
    </section>;
};

export const CustomErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary
            FallbackComponent = { ErrorView }
            onError = { (error, errorInfo) => {
                console.log(error, errorInfo);
            } }>
            { children }
        </ErrorBoundary>
    );
};
