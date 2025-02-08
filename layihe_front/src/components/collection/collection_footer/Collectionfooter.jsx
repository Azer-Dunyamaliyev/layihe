import React, { useEffect } from 'react'
import styles from './collectionfooter.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryThunk } from '../../../redux/reducers/productsSlice'
const Collectionfooter = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
      if (name) {
        dispatch(getCategoryThunk({ name }));
      }
    }, [dispatch,name]);
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <ul>
            <li>
              <Link to={`/${name}`}>Man</Link>
              <span>/</span>
            </li>
            <li>
              <Link to={`/category/${name}`}>Collection</Link>
              <span>/</span>
            </li>
            <li>
              <p>{products.length} items</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Collectionfooter