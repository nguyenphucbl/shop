import styles from './Carousel.module.scss';
import classNames from 'classnames/bind';
import CarouselItem from './CarouselItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getCarouselItems } from '~/services/carouselService';
const cx = classNames.bind(styles);

export default function Carousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getCarouselItems(0, 8);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching carousel items', error);
      }
    };
    fetchData();
  }, []);
  // const dragging = e => {
  //   const target = e.target;
  //   target.scrollLeft = e.pageX;
  // };
  const handlePrev = e => {
    console.log(e);
  };
  const handleNext = () => {};
  return (
    <div className={cx('wrapper')}>
      {isLoading ? (
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <>
          {data.map(item => (
            <div key={item.id} className={cx('box')}>
              <CarouselItem data={item} />
            </div>
          ))}

          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            className={cx('controls', 'icon-left')}
            onClick={handlePrev}
          />
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className={cx('controls', 'icon-right')}
            onClick={handleNext}
          />
        </>
      )}
    </div>
  );
}
