import React from 'react'

const Content = (props) => {
    console.log(props);
    return (
        <div>
                { props.activeTab.name === 'Tab 1' ?
                    <section className="panel panel-success">
                        <h2 className="panel-heading">Content 1</h2>
                        <p className="panel-body">Bacon ham hock kevin boudin rump leberkas. Spare ribs kielbasa shankle hamburger tongue jerky pork chop bresaola. Shoulder pork belly short loin strip steak prosciutto frankfurter. Beef kevin t-bone venison pork belly meatball chuck short loin bresaola doner picanha. Cupim short ribs short loin brisket bacon rump porchetta venison t-bone drumstick pork chop hamburger meatball. Pork loin frankfurter shankle pork picanha pastrami. Pork loin pancetta venison short loin frankfurter.</p>
                    </section>
                    : null }
                { props.activeTab.name === 'Tab 2' ?
                    <section className="panel panel-warning">
                        <h2 className="panel-heading">Content 2</h2>
                        <p className="panel-body">Atlantic herring jellynose fish Siamese fighting fish pollock: cobbler snakehead sea raven! Freshwater shark sergeant major clingfish sweeper galjoen fish mudfish longjaw mudsucker. Death Valley pupfish pomfret electric ray zingel African glass catfish squawfish yellowtail snapper grunt sculpin.</p>
                    </section>
                    : null }
                { props.activeTab.name === 'Tab 3' ?
                    <section className="panel panel-danger">
                        <h2 className="panel-heading">Content 3</h2>
                        <p className="panel-body">Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>
                    </section>
                    : null }
            </div>
  
    )
}

export default Content;