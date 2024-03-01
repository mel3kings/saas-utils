import React, { FC } from 'react';
import Facebook from './facebook';
import Twitter from './twiter';
import Whatsapp from './whatsapp';
import './style.scss';

type TShareProps = {};

const Share: FC<TShareProps> = () => {
	const currentUrl = encodeURIComponent(window.location.href);
	const shareText = encodeURIComponent('Check out:');

	const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
	const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;

	return (
		<div className="share">
			<div>Share this page:</div>
			<a className="facebook-share-button px-2" href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
				<Facebook />
			</a>
			<a className="whatsapp-share-button" href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
				<Whatsapp />
			</a>
			<a className="twitter-share-button" href={`https://twitter.com/intent/tweet?url=${currentUrl}`} data-size="large">
				<Twitter />
			</a>
		</div>
	);
};

export default Share;
