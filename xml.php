<?php
header("Content-type: text/xml;charset=utf-8");
$string = <<<XML
<a>
    <b>
        <c>text</c>
        <c>stuff</c>
    </b>
    <d>
        <c>code</c>
    </d>
</a>
XML;

$xml = new SimpleXMLElement($string);

echo $xml->asXML();
?>