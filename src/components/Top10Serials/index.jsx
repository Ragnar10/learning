// Styles
import Styles from './styles.module.scss';

export const Top10Serials = () => {
    return (
        <div className = { Styles.container }>
            <figure className = { Styles.poster }>
                <img src = { 'https://www.ixbt.com/img/n1/news/2022/11/0/654546_large.png' } alt = { 'poster' } />
                <figcaption>{ '«Одни из нас» / The Last of Us' }</figcaption>
            </figure>
            <figure className = { Styles.poster }>
                <img src = { 'https://images.unian.net/photos/2022_07/thumb_files/1200_0_1657026499-7649.jpg' } alt = { 'poster' } />
                <figcaption>{ '«Очень странные дела» / Stranger Things' }</figcaption>
            </figure>
            <figure className = { Styles.poster }>
                <img src = { 'https://7kingdoms.ru/wp-content/uploads/2022/06/wallpaper.jpg' } alt = { 'poster' } />
                <figcaption>{ '«Дом дракона» / House of the Dragon' }</figcaption>
            </figure>
        </div>
    );
};
