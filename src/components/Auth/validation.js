// Instruments
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const validSchema = (type) => {
    const schema = {
        email: Yup.string()
            .required('Обов\'язкове поле')
            .matches(
                /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
                'Будь ласка, введіть дійсну адресу електронної пошти',
            ),
        password: Yup.string()
            .required('Обов\'язкове поле')
            .min(6, 'Мінімальна довжина 6')
            .max(30, 'Максимальна довжина 30')
            .matches(
                /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/,
                'Додайте принаймні 1 цифру, 1 малу та 1 велику літеру',
            ),

    };

    if (type === 'signup') {
        schema[ 'name' ] = Yup.string()
            .required('Обов\'язкове поле')
            .min(2, 'Мінімальна довжина 2')
            .max(50, 'Максимальна довжина 50');
    }

    return yupResolver(Yup.object().shape(schema));
};
