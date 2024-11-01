import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import CarouselItem from './CarouselItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { getCategoryItems } from '~/services/carouselService';
const cx = classNames.bind(styles);

export default function Category() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getCategoryItems(0, 4);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching carousel items', error);
      }
    };
    fetchData();
  }, []);
  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    console.log({ x, startX });
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  const handlePrev = () => {
    carouselRef.current.scrollLeft -= 200;
  };
  const handleNext = () => {
    carouselRef.current.scrollLeft += 200;
  };
  return (
    <div className={cx('wrapper')}>
      {isLoading ? (
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <>
          <div
            className={cx('box-container')}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={carouselRef}
            style={{
              cursor: isDragging ? 'grabbing' : '',
            }}
          >
            {data.map(item => (
              <div key={item.id} className={cx('box')}>
                <CarouselItem data={item} />
              </div>
            ))}
          </div>

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
