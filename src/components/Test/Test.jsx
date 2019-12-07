import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { test } from '../../redux/actions/index';

const Test = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch(test());
  };
  return (
    <>
      <button style={{ marginTop: '500px' }} onClick={incrementCount}>
        Test
      </button>
      <h2 style={{ width: '100px', marginTop: '500px' }}>
        {count}
      </h2>
    </>
  );
};
// const mapDispatchToProps = {
//   test,
// };
//
// export default connect(
//   (state) => state,
//   mapDispatchToProps,
// )(Test);

export default Test;
