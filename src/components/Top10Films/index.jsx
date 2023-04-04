// Styles
import Styles from './styles.module.scss';

export const Top10Films = () => {
    return (
        <div className = { Styles.container }>
            <figure className = { Styles.poster }>
                <img src = { 'https://itc.ua/wp-content/uploads/2023/03/dnd-honor-among-thieves-movie-poster.jpeg' } alt = { 'poster' } />
                <figcaption>{ '«Подземелья и драконы: Честь воров» / Dungeons and Dragons: Honor Among Thieves' }</figcaption>
            </figure>
            <figure className = { Styles.poster }>
                <img src = { 'https://static.espreso.tv/uploads/photobank/267000_268000/267952_41441.png' } alt = { 'poster' } />
                <figcaption>{ '«Стражи Галактики 3» / Guardians of the Galaxy Vol. 3' }</figcaption>
            </figure>
            <figure className = { Styles.poster }>
                <img src = { 'https://gamemag.ru/images/cache/News/News176900/806bb41d37-2_1390x600.jpg' } alt = { 'poster' } />
                <figcaption>{ '«Форсаж 10» / Fast X' }</figcaption>
            </figure>
        </div>
    );
};
