module Tags
    class TNavs < Liquid::Block
        def render(context)
            '<ul class="nav nav-tabs">' + super + "</ul>"
        end
    end 

    class TNav < Liquid::Block
        def initialize(tag_name, tab, tokens)
            super
            @tab = tab.strip
        end

        def render(context)
            return "" if @tab.empty?

            site      = context.registers[:site]
            converter = site.find_converter_instance(Jekyll::Converters::Markdown)

            lines = super.rstrip.split(/\r\n|\r|\n/).select { |line| line.size > 0 }
            indentation = lines.map do |line|
                match = line.match(/^(\s+)[^\s]+/)
            match ? match[1].size : 0
            end
            indentation = indentation.min

            content = indentation ? super.gsub(/^#{' |\t' * indentation}/, '') : super
            content = converter.convert(content)
            content = content.strip # Strip again to avoid "\n"

            '<li> <a href="#' + @tab + '" data-toggle="tab">' + content + "</a></li>"
        end
    end

 end 

Liquid::Template.register_tag("tnavs", Tags::TNavs)
Liquid::Template.register_tag("tnav",  Tags::TNav)

