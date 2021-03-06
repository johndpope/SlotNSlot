import React from 'react';
import styles from './makeAndPlayContainer.scss';
import Icon from '../../../icons';

const MakeAndPlayContainer = () =>
  <div className={styles.makeAndPlayContainer}>
    <div className={styles.innerContainer}>
      <div className={styles.makeAndPlayTitle}>
        Why do you always <span>PLAY</span>? Now <span>MAKE</span> your own with SlotNSlot !
      </div>
      <div className={styles.makeAndPlayContext}>
        <img src="https://d1qh7kd1bid312.cloudfront.net/about/Browser_content.png" alt="browser" />
        <div className={`${styles.bubble} ${styles.left}`}>
          <Icon className={styles.bubbleImage} icon="BUBBLE_LEFT" />
          <div className={styles.bubbleContext}>
            <div className={styles.bubbleTitle}>Make Slot</div>
            <div className={styles.bubbleText}>
              -Easiest way in the world to make your slots!<br />-Mine ETH through slots!<br />-You have control over
              your slots' hit rates!
            </div>
          </div>
        </div>
        <div className={`${styles.bubble} ${styles.right}`}>
          <Icon className={styles.bubbleImage} icon="BUBBLE_RIGHT" />
          <div className={styles.bubbleContext}>
            <div className={styles.bubbleTitle}>Play Slot</div>
            <div className={styles.bubbleText}>
              -Ruin slots with the lowest bankrolls!<br />-Find slots with highest odds!<br />-Build your own strategy
              to maximize prize!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
export default MakeAndPlayContainer;
