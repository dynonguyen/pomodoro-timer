import React from 'react';
import '../../styles/css/global-loading.css';

function GlobalLoading() {
	return (
		<div className='socket'>
			<div className='gel center-gel'>
				<div className='hex-brick h1'></div>
				<div className='hex-brick h2'></div>
				<div className='hex-brick h3'></div>
			</div>

			{new Array(6).fill(0).map((_, i) => (
				<div key={i} className={`gel c${i + 1} r1`}>
					<div className='hex-brick h1'></div>
					<div className='hex-brick h2'></div>
					<div className='hex-brick h3'></div>
				</div>
			))}

			{new Array(12).fill(0).map((_, i) => (
				<div key={i} className={`gel c${i + 7} r2`}>
					<div className='hex-brick h1'></div>
					<div className='hex-brick h2'></div>
					<div className='hex-brick h3'></div>
				</div>
			))}

			{new Array(19).fill(0).map((_, i) => (
				<div key={i} className={`gel c${i + 19} r3`}>
					<div className='hex-brick h1'></div>
					<div className='hex-brick h2'></div>
					<div className='hex-brick h3'></div>
				</div>
			))}
		</div>
	);
}

export default GlobalLoading;
