import React from 'react'

const CompanyProfile = () => {
    return (
        <div className=" pt-16 pt-lg-22 pb-lg-27">
            <div className="container1">
                <div className="row">
                    <div className="col-12 col-xl-9 col-lg-8">
                        <div className="bg-white rounded-4 pt-11 shadow-9">
                            <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                                <a className="mr-xs-7 mb-5 mb-xs-0">
                                    <img className="square-72 rounded-6" src="" alt="img" />
                                </a>
                                <div>
                                    <h2 className="mt-xs-n5">
                                        <a className="font-size-6 text-black-2 font-weight-semibold">
                                        Swipe smart
                                        </a>
                                    </h2>
                                    <span className="mb-0 text-gray font-size-4">Job Portal</span>
                                </div>
                            </div>
                            <ul className="nav border-bottom border-mercury pl-12">
                                <li className="tab-menu-items nav-item pr-12">
                                    <a className="active text-uppercase font-size-3 font-weight-bold text-default-color py-3">
                                        company
                                    </a>
                                </li>
                                <li className="tab-menu-items nav-item pr-12">
                                    <a className="text-uppercase font-size-3 font-weight-bold text-default-color py-3">
                                        jobs
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content pl-12 pt-10 pb-7 pr-12 pr-xxl-24">
                                <div className="tab-pane fade show">
                                    <div className="row">
                                        <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                                            <div className="mb-8">
                                                <p className="font-size-4">Company size</p>
                                                <h5 className="font-size-4 font-weight-semibold text-black-2">11-50 employees</h5>
                                            </div>
                                            <div className="mb-8">
                                                <p className="font-size-4">Company size</p>
                                                <h5 className="font-size-4 font-weight-semibold text-black-2">11-50 employees</h5>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                                            <div className="mb-8">
                                                <p className="font-size-4">Type of corporation</p>
                                                <h5 className="font-size-4 font-weight-semibold text-black-2">B2B &amp; B2C</h5>
                                            </div>
                                            <div className="mb-8">
                                                <p className="font-size-4">Social Media</p>
                                                <div className="icon-link d-flex align-items-center">
                                                    <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green" href="#">
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                    <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green" href="#">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                    <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green" href="#">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                    <a className="text-smoke circle-32 bg-concrete mr-5 hover-bg-green" href="#">
                                                        <i className="fa fa-globe"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                                            <div className="mb-8">
                                                <p className="font-size-4">Location</p>
                                                <h5 className="font-size-4 font-weight-semibold text-black-2">New York City</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold">About Swipe Smart</h4>
                                    <div className="pt-5 ">
                                        <p className="font-size-4 mb-8">If you’re like most of my clients, you know creative content marketing and
                                        killer copywriting are
                      fundamental to the success of your business.</p>
                                        <p className="font-size-4 mb-8">But with so much to do to keep your business growing, you don’t have time to
                                        learn how to write sales
                                        copy that actually sells, or create a content marketing strategy that resonates with your target
                      audience.</p>
                                        <p className="font-size-4  mb-8">You’ve been disappointed with your traffic and conversions so far, but with
                                        an overwhelming number of
                      things to do, you’ve put off doing anything about it until now.</p>
                                        <p className="font-size-4 mb-8">So you’ve come to Upwork, looking for someone that can craft creative
                                        content and killer sales copy
                      to help you reach more people and make more sales.</p>
                                        <p className="font-size-4 mb-8">But your troubles aren’t over just yet; it isn’t easy to find someone who
                                        can create the high-quality
                      content you need. But your troubles aren’t over just yet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyProfile;