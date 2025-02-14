import React from 'react'
import styles from './detailinfo.module.scss'
import { useLocation } from 'react-router-dom'
const DetailInfo = () => {
    const infoData = useLocation()
    
  return (
    <div className={styles.detail_info}>
        <div className={styles.texts}>
        
        </div>
    </div>
  )
}

export default DetailInfo