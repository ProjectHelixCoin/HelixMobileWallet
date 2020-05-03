const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

export default class PayjoinWallet {
  constructor(psbt, broadcast) {
    this.psbt = psbt;
    this.broadcast = broadcast;
  }

  /**
   * @async
   * This creates a fully signed, finalized, and valid Psbt.
   *
   * @return {Promise<Psbt>} The Original non-payjoin Psbt for submission to
   * the payjoin server.
   */
  async getPsbt() {
    return this.psbt;
  }

  /**
   * @async
   * This takes the payjoin Psbt and signs, and finalizes any un-finalized
   * inputs. Any checks against the payjoin proposal Psbt should be done here.
   * However, this library does perform some sanity checks.
   *
   * @param {Psbt} payjoinProposal - A Psbt proposal for the payjoin. It is
   * assumed that all inputs added by the server are signed and finalized. All
   * of the PayjoinClientWallet's inputs should be unsigned and unfinalized.
   * @return {Psbt} The signed and finalized payjoin proposal Psbt
   * for submission to the payjoin server.
   */
  async signPsbt(payjoinPsbt) {
    // TODO: sign payjoinPsbt
    return payjoinPsbt;
  }

  /**
   * @async
   * This takes the fully signed and constructed payjoin transaction hex and
   * broadcasts it to the network. It returns true if succeeded and false if
   * broadcasting returned any errors.
   *
   * @param {string} txHex - A fully valid transaction hex string.
   * @return {string} Empty string ('') if succeeded, RPC error
   * message string etc. if failed.
   */
  async broadcastTx(txHex) {
    return this.broadcast(txHex);
  }

  /**
   * @async
   * This takes the original transaction (submitted to the payjoin server at
   * the beginning) and attempts to broadcast it X milliSeconds later.
   * Notably, this MUST NOT throw an error if the broadcast fails, and if
   * the broadcast succeeds it MUST be noted that something was wrong with
   * the payjoin transaction.
   *
   * @param {string} txHex - A fully valid transaction hex string.
   * @param {number} milliSeconds - The number of milliSeconds to wait until
   * attempting to broadcast
   * @return {void} This should return once the broadcast is scheduled
   * via setTimeout etc. (Do not wait until the broadcast occurs to return)
   */
  async scheduleBroadcastTx(txHex, milliseconds) {
    return delay(milliseconds).then(() => this.broadcastTx(txHex));
  }

  /**
   * @async
   * This takes a psbt and calculates the sum paid to us.
   * Calculated as below. See example in the tests for a BIP32 wallet.
   * (total value of outputs to me) - (total value of inputs from me)
   * So if I am sending money to someone, it will be negative, if I am
   * receiving money from someone it will be positive.
   *
   * @param {Psbt} psbt - A psbt provided from getPsbt or the payjoinProposal
   * from the server.
   * @return {number} The sum in satoshis that would be paid to your wallet.
   * Negative if paying out.
   */
  async getSumPaidToUs(psbt) {
    let sumPaidToUs = 0;
    // TODO: calculate sumPaidToUs

    return sumPaidToUs;
  }
}