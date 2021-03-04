import React from 'react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

const ListLoader = () => (
  <SkeletonTheme color="#e5ebed" highlightColor="#d3dce0">
    <div className="table-loader">
      <Skeleton count={1} width={100} />
    </div>
  </SkeletonTheme>
)

export default ListLoader
