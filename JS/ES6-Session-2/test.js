class Node{
    constructor(data){
        this.data = data
        this.link = null
    }
}
class LinkedList{
    constructor()
    {
        this.head = null
        this.length = 0
    }
}
// n = 2->head
// 1->2->3
LinkedList.prototype.addFirst = (data)=>{
    let n = new Node(data)
    n.link = this.head;
    this.head = n
    this.length +=1
    return this.head
}
LinkedList.prototype.addLast = (data)=>{
    let n = new Node(data);
    let x = this.head;
    while(x.link!=null)
    {
        x = x.link
    }
    x.link = n
    return head;

}
let ll = new LinkedList()
console.log(ll)
ll.addFirst(1)
ll.addFirst(2)
ll.addFirst(3)