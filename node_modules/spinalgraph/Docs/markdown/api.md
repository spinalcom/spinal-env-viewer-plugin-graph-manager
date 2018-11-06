<a name="SpinalNodePointer"></a>

## SpinalNodePointer
Wrapper over SpinalNodePointer containing some information about the pointed element

**Kind**: global class  

* [SpinalNodePointer](#SpinalNodePointer)
    * [.setElement(element)](#SpinalNodePointer+setElement)
    * [.getId()](#SpinalNodePointer+getId) ⇒ <code>string</code>

<a name="SpinalNodePointer+setElement"></a>

### spinalNodePointer.setElement(element)
Set pointer to point this element

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  

| Param | Type |
| --- | --- |
| element | <code>\*</code> | 

<a name="SpinalNodePointer+getId"></a>

### spinalNodePointer.getId() ⇒ <code>string</code>
This function return the id of the pointed element

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
<a name="SpinalNode"></a>

## SpinalNode
**Kind**: global class  

* [SpinalNode](#SpinalNode)
    * [new SpinalNode(type, element)](#new_SpinalNode_new)
    * [.getId()](#SpinalNode+getId) ⇒ <code>string</code>
    * [.getElement()](#SpinalNode+getElement) ⇒
    * [.getType()](#SpinalNode+getType) ⇒ <code>string</code>
    * [.hasRelation(relationName, relationType)](#SpinalNode+hasRelation) ⇒ <code>boolean</code>
    * [.hasRelations(relationNames, relationType)](#SpinalNode+hasRelations) ⇒ <code>boolean</code>
    * [.addChild(child, relationName, relationType)](#SpinalNode+addChild) ⇒ <code>\*</code>
    * [.removeChild(node, relationName, relationType)](#SpinalNode+removeChild)
    * [.removeFromGraph()](#SpinalNode+removeFromGraph)
    * [.getChildren(relationNames)](#SpinalNode+getChildren) ⇒ <code>Promise.&lt;(Array\|never\|void)&gt;</code>
    * [.getParent(relationNames)](#SpinalNode+getParent) ⇒ <code>Array</code>
    * [._createRelation(relationName, relationType)](#SpinalNode+_createRelation)

<a name="new_SpinalNode_new"></a>

### new SpinalNode(type, element)

| Param | Default | Description |
| --- | --- | --- |
| type | <code>SpinalNode</code> | of the spinalNode default SpinalNode |
| element |  | optional element pointed by the node by default setElement to a new empty new Model |

<a name="SpinalNode+getId"></a>

### spinalNode.getId() ⇒ <code>string</code>
Shortcut to info.id

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
<a name="SpinalNode+getElement"></a>

### spinalNode.getElement() ⇒
Return the element

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: a promise where the parameter of the resolve method is the element.  
<a name="SpinalNode+getType"></a>

### spinalNode.getType() ⇒ <code>string</code>
Shortcut to info.type

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>string</code> - type of the node.  
<a name="SpinalNode+hasRelation"></a>

### spinalNode.hasRelation(relationName, relationType) ⇒ <code>boolean</code>
Verify if the node contain the relation name @param relationName

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>boolean</code> - return true is the relation is contain in the node false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | name of the relation. |
| relationType | <code>int</code> | relation type |

<a name="SpinalNode+hasRelations"></a>

### spinalNode.hasRelations(relationNames, relationType) ⇒ <code>boolean</code>
Verify if the node contain all the relation name contain @param relationName

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>boolean</code> - return true if the node contain all the relations contain in relationNames false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>array</code> | Array containing all the relation name |
| relationType | <code>int</code> | relation type |

<a name="SpinalNode+addChild"></a>

### spinalNode.addChild(child, relationName, relationType) ⇒ <code>\*</code>
Add the @param as child of the relation

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> | element to add as child |
| relationName | <code>string</code> | name of the relation |
| relationType | <code>int</code> | type of the relation |

<a name="SpinalNode+removeChild"></a>

### spinalNode.removeChild(node, relationName, relationType)
Remove the node from the relation children.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  

| Param |
| --- |
| node | 
| relationName | 
| relationType | 

<a name="SpinalNode+removeFromGraph"></a>

### spinalNode.removeFromGraph()
Remove the node from the graph i.e remove the node from all the parent relation and remove all the children relation
this operation might also delete all the sub-graph under this node.
After this operation the node can be deleted without fear.

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
<a name="SpinalNode+getChildren"></a>

### spinalNode.getChildren(relationNames) ⇒ <code>Promise.&lt;(Array\|never\|void)&gt;</code>
Return all children for the relation name no matter the type of relation

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;(Array\|never\|void)&gt;</code> - containing all children for the relation name. The array might be empty  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array</code> | containing the relation name of the desired children |

<a name="SpinalNode+getParent"></a>

### spinalNode.getParent(relationNames) ⇒ <code>Array</code>
Return all parents for the relation name no matter the type of relation

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Array</code> - containing all parents for the relation name. The array might be empty  

| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array</code> | containing the relation name of the desired parents |

<a name="SpinalNode+_createRelation"></a>

### spinalNode.\_createRelation(relationName, relationType)
create a new relation for this node

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Access**: protected  

| Param |
| --- |
| relationName | 
| relationType | 

<a name="SpinalGraph"></a>

## SpinalGraph
**Kind**: global class  

* [SpinalGraph](#SpinalGraph)
    * [new SpinalGraph(type, element)](#new_SpinalGraph_new)
    * [.addContext(context)](#SpinalGraph+addContext)
    * [.getContext(name)](#SpinalGraph+getContext) ⇒ <code>SpinalContext</code> \| <code>undefined</code>

<a name="new_SpinalGraph_new"></a>

### new SpinalGraph(type, element)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;SpinalGraph&quot;</code> | default "SpinalGraph" |
| element | <code>Model</code> |  |  |

<a name="SpinalGraph+addContext"></a>

### spinalGraph.addContext(context)
this function add context to the graph

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  

| Param |
| --- |
| context | 

<a name="SpinalGraph+getContext"></a>

### spinalGraph.getContext(name) ⇒ <code>SpinalContext</code> \| <code>undefined</code>
Searches for a context using its name

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>SpinalContext</code> \| <code>undefined</code> - The wanted context or undefined  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the context |

<a name="SpinalContext"></a>

## SpinalContext
**Kind**: global class  

* [SpinalContext](#SpinalContext)
    * [new SpinalContext(type, name, element)](#new_SpinalContext_new)
    * [.createRelation(parent, child, relationName)](#SpinalContext+createRelation) ⇒ <code>string</code>
    * [.addRelationId(relationId)](#SpinalContext+addRelationId)
    * [.removeFromGraph()](#SpinalContext+removeFromGraph)
    * [.addChild(child, relationName, relationType)](#SpinalContext+addChild)

<a name="new_SpinalContext_new"></a>

### new SpinalContext(type, name, element)

| Param | Default | Description |
| --- | --- | --- |
| type | <code>SpinalContext</code> | of the context |
| name | <code>undefined</code> | of the context |
| element |  | of the node |

<a name="SpinalContext+createRelation"></a>

### spinalContext.createRelation(parent, child, relationName) ⇒ <code>string</code>
Create a relation between a node and another node/model. this function can be used to linked two context

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>SpinalNode</code> | parent of the relation |
| child | <code>SpinalNode</code> \| <code>Model</code> | child of the relation |
| relationName | <code>string</code> | name of the relation |

<a name="SpinalContext+addRelationId"></a>

### spinalContext.addRelationId(relationId)
Add the relation id to the relation id displayable by this context

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  

| Param | Type |
| --- | --- |
| relationId | <code>string</code> | 

<a name="SpinalContext+removeFromGraph"></a>

### spinalContext.removeFromGraph()
Remove all the node associate to this context from the graph

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
<a name="SpinalContext+addChild"></a>

### spinalContext.addChild(child, relationName, relationType)
Add Child to the to the context with a spinalRelationLstPtrType

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>SpinalNode</code> \| <code>Model</code> | to be added as child |
| relationName | <code>string</code> | name of the relation |
| relationType | <code>int</code> | this parameter is here only to properly override the parent method. |

