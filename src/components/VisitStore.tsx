import { storeInfo } from "@/utils/siteContent";

export default function VisitStore() {
  return (
    <section className="visit section-pad" id="visit">
      <div className="visit__content">
        <p className="section-kicker">Final stop</p>
        <h2>From scroll to store, find the cycle that fits.</h2>
        <p>
          Visit Syed Cycle Mart for kids cycles, ladies cycles, gents cycles, gear models,
          accessories, and quick repair support from Trunk Road, Ganagapeta.
        </p>
      </div>

      <div className="visit__panel">
        <div>
          <span>Address</span>
          <p>{storeInfo.address}</p>
        </div>
        <div>
          <span>Hours</span>
          <p>{storeInfo.hours}</p>
        </div>
        <div>
          <span>Payments</span>
          <p>Cash and UPI-friendly local buying.</p>
        </div>
        <a className="button button--primary" href={storeInfo.mapUrl} target="_blank" rel="noreferrer">
          Open Google Maps
        </a>
      </div>
    </section>
  );
}
