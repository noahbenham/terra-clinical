import React from 'react';
import AppDelegate from 'terra-app-delegate';
import Button from 'terra-button';

const ChartReviewModal = ({ app }) => {
  return (
    <div>
      <h3>Hurray!</h3>
      <Button text="Close" onClick={app.closeDisclosure} />
    </div>
  )
}

AppDelegate.registerComponentForDisclosure('ChartReviewModal', ChartReviewModal);

class ChartReview extends React.Component {
  constructor(props) {
    super(props);

    this.updateSelectedSection = this.updateSelectedSection.bind(this);
    this.sectionMapping = {};
    this.state = {};
  }

  componentDidMount() {
    document.addEventListener('chartReviewSectionSelected', this.updateSelectedSection);
  }

  componentWillUnmount() {
    document.removeEventListener('chartReviewSectionSelected', this.updateSelectedSection);
  }

  updateSelectedSection(event) {
    this.setState({
      selectedSection: event.detail.section,
    })

    if (this.props.routingManager.toggleMenu && this.props.routingManager.menuIsOpen) {
      this.props.routingManager.toggleMenu();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedSection) {
     this.root.scrollTop = this.sectionMapping[this.state.selectedSection].offsetTop;
    }
  }

  render() {
    return (
      <div style={{ height: '100%', overflow: 'auto' }} ref={(el) => {this.root = el;}}>
        <h2>Review</h2>
        <br />
        <Button
          text="Modal"
          onClick={() => {
            this.props.app.disclose({
              preferredType: 'modal',
              content: {
                key: 'CHART_REVIEW_MODAL',
                name: 'ChartReviewModal',
              },
            })
          }}
        />
        <p>Selected Section: {this.state.selectedSection}</p>
        <br />
        <hr />
        <div className="section1" ref={(ref) => { this.sectionMapping['Section 1'] = ref; }}>
          <h3>Section 1</h3>
          <p>Among the vicissitudes incident to life no event could have filled me with greater anxieties than that of which the notification was transmitted by your order, and received on the 14th day of the present month.</p>
          <br />
          <p>On the one hand, I was summoned by my country, whose voice I can never hear but with veneration and love, from a retreat which I had chosen with the fondest predilection, and, in my flattering hopes, with an immutable decision, as the asylum of my declining years—a retreat which was rendered every day more necessary as well as more dear to me by the addition of habit to inclination, and of frequent interruptions in my health to the gradual waste committed on it by time.</p>
          <br />
          <p>On the other hand, the magnitude and difficulty of the trust to which the voice of my country called me, being sufficient to awaken in the wisest and most experienced of her citizens a distrustful scrutiny into his qualifications, could not but overwhelm with despondence one who (inheriting inferior endowments from nature and unpracticed in the duties of civil administration) ought to be peculiarly conscious of his own deficiencies. In this conflict of emotions all I dare aver is that it has been my faithful study to collect my duty from a just appreciation of every circumstance by which it might be affected. All I dare hope is that if, in executing this task, I have been too much swayed by a grateful remembrance of former instances, or by an affectionate sensibility to this transcendent proof of the confidence of my fellow-citizens, and have thence too little consulted my incapacity as well as disinclination for the weighty and untried cares before me, my error will be palliated by the motives which mislead me, and its consequences be judged by my country with some share of the partiality in which they originated.</p>
          <br />
          <p>Such being the impressions under which I have, in obedience to the public summons, repaired to the present station, it would be peculiarly improper to omit in this first official act my fervent supplications to that Almighty Being who rules over the universe, who presides in the councils of nations, and whose providential aids can supply every human defect, that His benediction may consecrate to the liberties and happiness of the people of the United States a Government instituted by themselves for these essential purposes, and may enable every instrument employed in its administration to execute with success the functions allotted to his charge. In tendering this homage to the Great Author of every public and private good, I assure myself that it expresses your sentiments not less than my own, nor those of my fellow-citizens at large less than either. No people can be bound to acknowledge and adore the Invisible Hand which conducts the affairs of men more than those of the United States. Every step by which they have advanced to the character of an independent nation seems to have been distinguished by some token of providential agency; and in the important revolution just accomplished in the system of their united government the tranquil deliberations and voluntary consent of so many distinct communities from which the event has resulted can not be compared with the means by which most governments have been established without some return of pious gratitude, along with an humble anticipation of the future blessings which the past seem to presage. These reflections, arising out of the present crisis, have forced themselves too strongly on my mind to be suppressed. You will join with me, I trust, in thinking that there are none under the influence of which the proceedings of a new and free government can more auspiciously commence.</p>
          <hr />
          <br />
        </div>
        <div className="section2" ref={(ref) => { this.sectionMapping['Section 2'] = ref; }}>
          <h3>Section 2</h3>
          <p>Four score and seven years ago our fathers brought forth on this continent a new nation conceived in liberty and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field as a final resting-place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we cannot dedicate, we cannot consecrate, we cannot hallow this ground. The brave men, living and dead, who struggled here have consecrated it far above our poor power to add or detract. The world will little note nor long remember what we say here, but it can never forget what they did here. It is for us the living rather to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain, that this nation under God shall have a new birth of freedom, and that government of the people, by the people, for the people shall not perish from the earth.</p>
          <hr />
          <br />
        </div>
        <div className="section3" ref={(ref) => { this.sectionMapping['Section 3'] = ref; }}>
          <h3>Section 3</h3>
          <p>We observe today not a victory of party but a celebration of freedom—symbolizing an end as well as a beginning—signifying renewal as well as change. For I have sworn before you and Almighty God the same solemn oath our forbears prescribed nearly a century and three-quarters ago.</p>
          <br />
          <p>The world is very different now. For man holds in his mortal hands the power to abolish all forms of human poverty and all forms of human life. And yet the same revolutionary beliefs for which our forebears fought are still at issue around the globe—the belief that the rights of man come not from the generosity of the state, but from the hand of God.</p>
          <hr />
          <br />
        </div>
        <div className="section4" ref={(ref) => { this.sectionMapping['Section 4'] = ref; }}>
          <h3>Section 4</h3>
          <p>Good evening. This is the 37th time I have spoken to you from this office in which so many decisions have been made that shape the history of this nation. Each time I have done so to discuss with you some matters that I believe affected the national interest.</p>
          <br />
          <p>In all the decisions I have made in my public life I have always tried to do what was best for the nation. Throughout the long and difficult period of Watergate, I have felt it was my duty to persevere; to make every possible effort to complete the term of office to which you elected me.</p>
          <hr />
          <br />
        </div>


      </div>
    );
  }
}

export default ChartReview;
